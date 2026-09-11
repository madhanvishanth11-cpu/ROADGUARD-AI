import React, { useState, useRef, useCallback } from 'react';
import { Camera, MapPin, UploadCloud, AlertTriangle, CheckCircle, Loader2, ArrowRight, X, Image as ImageIcon, Activity, Info, Map as MapIcon } from 'lucide-react';
import { getCurrentLocation, reverseGeocode, getDistanceInMeters } from '../../utils/location';
import { calculateRiskScore } from '../../utils/riskScore';
import { analyzeRoadImage, getAiProviderMode } from '../../services/ai/roadDamageAnalyzer';
import { createReport, uploadReportImage, getReports } from '../../services/db/api';
import type { AIAnalysisResult } from '../../types/ai';
import { Link } from 'react-router-dom';
import { AIResultCard } from '../../components/AIResultCard';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix for default leaflet marker icon in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ position, setPosition }: { position: L.LatLng | null, setPosition: (p: L.LatLng) => void }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position === null ? null : <Marker position={position} />;
};

export const ReportPage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const aiMode = getAiProviderMode();
  
  // Image State
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageError, setImageError] = useState('');
  
  // Location State
  const [location, setLocation] = useState<{ latitude: number; longitude: number; accuracy?: number } | null>(null);
  const [locationSource, setLocationSource] = useState<'GPS' | 'MANUAL'>('MANUAL');
  const [address, setAddress] = useState<string>('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState('');
  
  // Analysis State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = useState('');
  
  // Submit State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedReportId, setSubmittedReportId] = useState<string | null>(null);
  const [duplicateWarning, setDuplicateWarning] = useState(false);

  // --- Image Upload Handlers ---
  const processFile = (file: File) => {
    setImageError('');
    setAnalysisError('');
    
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(file.type)) {
      setImageError('Please upload a valid image file (JPG, PNG, WEBP).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setImageError('Image is too large. Maximum size is 10MB.');
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    
    setAnalysisResult(null);
    setSubmitError('');
    setDuplicateWarning(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setAnalysisError('');
    setSubmitError('');
    setImageError('');
    setDuplicateWarning(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // --- Location Handlers ---
  const updateAddress = async (lat: number, lon: number) => {
    const addr = await reverseGeocode(lat, lon);
    setAddress(addr || `Lat: ${lat.toFixed(4)}, Lng: ${lon.toFixed(4)}`);
  };

  const handleGetLocation = async () => {
    setIsLocating(true);
    setLocationError('');
    try {
      const coords = await getCurrentLocation();
      setLocation({ latitude: coords.latitude, longitude: coords.longitude, accuracy: coords.accuracy });
      setLocationSource('GPS');
      await updateAddress(coords.latitude, coords.longitude);
    } catch (err: any) {
      setLocationError('Location permission is required for automatic location detection. Please manually click on the map to set the location.');
      console.warn("GPS Error:", err);
      // Ensure we don't block them entirely. If they never set location, provide a default map center so they can click it.
      if (!location) setLocation({ latitude: 13.0827, longitude: 80.2707 }); 
    } finally {
      setIsLocating(false);
    }
  };

  const handleMapClick = useCallback((latlng: L.LatLng) => {
    setLocation({ latitude: latlng.lat, longitude: latlng.lng });
    setLocationSource('MANUAL');
    setLocationError('');
    updateAddress(latlng.lat, latlng.lng);
  }, []);

  // --- Analysis Handlers ---
  const handleAnalyzeImage = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    setAnalysisError('');
    setDuplicateWarning(false);
    try {
      const result = await analyzeRoadImage(image);
      setAnalysisResult(result);
    } catch (err: any) {
      setAnalysisError(err.message || 'AI analysis failed. Please try again or use a different image.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // --- Submit Handlers ---
  const checkDuplicate = async (lat: number, lon: number) => {
    const existingReports = await getReports();
    // Check unresolved reports within 50 meters
    for (const report of existingReports) {
      if (report.status !== 'RESOLVED' && report.status !== 'REJECTED') {
        const dist = getDistanceInMeters(lat, lon, report.latitude, report.longitude);
        if (dist < 50) return true;
      }
    }
    return false;
  };

  const handleSubmit = async (forceSubmit = false) => {
    if (!image || !imagePreview || !location || !analysisResult) return;
    if (!analysisResult.potholeDetected) return; 

    // Coordinate validation
    if (location.latitude < -90 || location.latitude > 90 || location.longitude < -180 || location.longitude > 180) {
      setSubmitError('Invalid GPS coordinates. Please update the location on the map.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      if (!forceSubmit && !duplicateWarning) {
        const isDuplicate = await checkDuplicate(location.latitude, location.longitude);
        if (isDuplicate) {
          setDuplicateWarning(true);
          setIsSubmitting(false);
          return; // Stop here, wait for them to click again to force submit
        }
      }

      const reportFreq = await getReports().then(reps => reps.filter(r => getDistanceInMeters(location.latitude, location.longitude, r.latitude, r.longitude) < 50).length);
      const riskEngineResult = calculateRiskScore({
        severity: analysisResult.estimatedSeverity,
        aiConfidence: analysisResult.confidence,
        estimatedSize: analysisResult.estimatedSize,
        trafficLevel: 'MEDIUM',
        locationType: 'LOCAL_ROAD',
        gpsAccuracy: location.accuracy,
        reportFrequency: reportFreq,
        weatherRisk: 'LOW'
      });

      const imageUrl = await uploadReportImage(image);
      
      const report = await createReport({
        latitude: location.latitude,
        longitude: location.longitude,
        gps_accuracy: location.accuracy,
        location_source: locationSource,
        address: address || 'User Provided Location',
        image_url: imageUrl, 
        pothole_detected: analysisResult.potholeDetected,
        confidence: analysisResult.confidence,
        severity: analysisResult.estimatedSeverity,
        estimated_size: analysisResult.estimatedSize,
        risk_score: riskEngineResult.score,
        risk_level: riskEngineResult.level,
        risk_factors: riskEngineResult.factors,
        risk_explanation: riskEngineResult.explanation,
        traffic_level: 'MEDIUM',
        location_type: 'LOCAL_ROAD',
        weather_risk: 'LOW',
        nearby_reports_count: reportFreq,
        priority: riskEngineResult.level,
        status: 'REPORTED'
      });
      
      // Save to local storage so the citizen can track it in /my-reports
      const myReports = JSON.parse(localStorage.getItem('my_roadguard_reports') || '[]');
      if (!myReports.includes(report.id)) {
        myReports.push(report.id);
        localStorage.setItem('my_roadguard_reports', JSON.stringify(myReports));
      }
      
      setSubmittedReportId(report.id);
    } catch (err: any) {
      let errorMessage = err.message || 'Failed to submit the report. Please try again.';
      if (err.details) errorMessage += ` Details: ${err.details}`;
      if (err.hint) errorMessage += ` Hint: ${err.hint}`;
      setSubmitError(errorMessage);
      console.error("Detailed Submit Error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Success Screen ---
  if (submittedReportId) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm text-center border border-gray-100">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted Successfully</h2>
          <p className="text-gray-500 mb-6">Thank you for keeping our roads safe. The authority has been notified.</p>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-left mb-8 space-y-3">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500">Report ID</span>
              <span className="font-mono font-bold text-blue-600">{submittedReportId}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500">Location</span>
              <span className="font-semibold text-gray-900 text-right truncate max-w-[180px]" title={address}>{address || 'GPS'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <span className="text-gray-500">Risk Score</span>
              <span className="font-semibold text-gray-900">{analysisResult?.riskScore}/100</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Status</span>
              <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs font-bold rounded-full">REPORTED</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => {
                removeImage();
                setLocation(null);
                setSubmittedReportId(null);
                setDuplicateWarning(false);
                setAddress('');
              }}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Report Another Issue
            </button>
            <Link to="/" className="w-full py-3 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors block text-center">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Report Road Damage</h1>
          <p className="text-gray-500 mt-2">Follow the steps below to report a pothole or road damage for AI assessment.</p>
        </div>
        <div className="self-start">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${aiMode === 'remote' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-700 border-gray-300'}`}>
            <Activity className="w-3 h-3" />
            AI Mode: {aiMode === 'remote' ? 'REAL AI' : 'DEMO'}
          </span>
        </div>
      </div>

      <div className="space-y-8">
        
        {/* Step 1: Image Upload */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
            Upload Road Image
          </h2>
          
          {imageError && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{imageError}</p>
            </div>
          )}
          
          {!imagePreview ? (
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50 hover:border-blue-400'}`}
            >
              <UploadCloud className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
              <p className="text-gray-700 font-medium text-lg mb-1">Drag and drop your image here</p>
              <p className="text-sm text-gray-500 mb-4">or click to browse from your device</p>
              
              <div className="flex items-center justify-center gap-4 mt-6">
                <button 
                  type="button" 
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-gray-50"
                >
                  <ImageIcon className="w-4 h-4" /> Browse
                </button>
                <button 
                  type="button" 
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-blue-100 sm:hidden"
                >
                  <Camera className="w-4 h-4" /> Camera
                </button>
              </div>
            </div>
          ) : (
            <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              <div className="relative">
                <img 
                  ref={imageRef}
                  src={imagePreview} 
                  alt="Road damage preview" 
                  className="w-full max-h-[500px] object-contain block" 
                />
                
                {/* Bounding Box Overlay */}
                {analysisResult?.boundingBoxes?.map((box, i) => (
                  <div 
                    key={i}
                    className="absolute border-2 border-red-500 bg-red-500/20"
                    style={{
                      left: `${box.xmin * 100}%`,
                      top: `${box.ymin * 100}%`,
                      width: `${(box.xmax - box.xmin) * 100}%`,
                      height: `${(box.ymax - box.ymin) * 100}%`,
                    }}
                  >
                    {box.label && (
                      <span className="absolute -top-6 left-[-2px] bg-red-500 text-white text-xs font-bold px-2 py-1 whitespace-nowrap">
                        {box.label} {box.confidence ? `(${Math.round(box.confidence * 100)}%)` : ''}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-white/90 backdrop-blur text-gray-900 rounded-lg font-medium text-sm flex items-center gap-2 shadow-sm hover:bg-white"
                >
                  <Camera className="w-4 h-4" /> Change
                </button>
                <button 
                  onClick={removeImage}
                  className="p-2 bg-white/90 backdrop-blur text-red-600 rounded-lg shadow-sm hover:bg-red-50 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
          <input 
            type="file" 
            accept="image/jpeg, image/png, image/webp" 
            capture="environment"
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleFileInput} 
          />
        </div>

        {/* Step 2: Location */}
        <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-opacity ${!image ? 'opacity-50 pointer-events-none' : ''}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
            Detect My Location
          </h2>
          
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                onClick={handleGetLocation}
                disabled={isLocating}
                className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
              >
                {isLocating ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}
                {isLocating ? 'Getting location...' : 'Detect GPS Location'}
              </button>
            </div>

            {locationError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{locationError}</p>
              </div>
            )}

            {location && !locationError && (
              <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex flex-col gap-1 w-full relative">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="font-bold">Location detected</span>
                  {locationSource === 'MANUAL' && <span className="ml-auto text-xs bg-green-200 px-2 py-0.5 rounded font-bold">MANUAL</span>}
                </div>
                <div className="pl-7 grid grid-cols-2 gap-x-4 gap-y-1 text-sm font-mono mt-1">
                  <div>Latitude: <span className="font-bold">{location.latitude.toFixed(4)}</span></div>
                  <div>Longitude: <span className="font-bold">{location.longitude.toFixed(4)}</span></div>
                  {location.accuracy !== undefined && (
                    <div className="col-span-2 text-green-700/80">Accuracy: <span className="font-bold">±{Math.round(location.accuracy)}m</span></div>
                  )}
                  {address && (
                    <div className="col-span-2 mt-1 text-xs bg-white/50 px-2 py-1 rounded inline-block w-max text-green-900 font-sans border border-green-200/50">
                      <MapIcon className="w-3 h-3 inline mr-1" />{address}
                    </div>
                  )}
                </div>
              </div>
            )}

            {(location || locationError) && (
              <div className="h-64 w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner mt-4 relative z-0">
                <MapContainer 
                  center={[location?.latitude || 13.0827, location?.longitude || 80.2707]} 
                  zoom={15} 
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker 
                    position={location ? new L.LatLng(location.latitude, location.longitude) : null} 
                    setPosition={handleMapClick} 
                  />
                </MapContainer>
                <div className="absolute top-2 right-2 z-[400] bg-white/90 backdrop-blur px-3 py-1.5 rounded-md text-xs font-bold text-blue-700 shadow border border-blue-100 flex items-center gap-1.5 cursor-pointer">
                  <MapPin className="w-3 h-3" /> Click map to set/adjust
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Step 3: AI Analysis */}
        <div className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-opacity ${(!image || !location) ? 'opacity-50 pointer-events-none' : ''}`}>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
            Analyze Road
          </h2>
          
          {aiMode === 'demo' && (
            <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-lg text-sm flex items-start gap-3">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>Demo AI — connect a pothole detection model for production.</p>
            </div>
          )}

          {analysisError && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p>{analysisError}</p>
            </div>
          )}
          
          {!analysisResult ? (
            <button
              onClick={handleAnalyzeImage}
              disabled={isAnalyzing}
              className="w-full px-6 py-4 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg font-bold text-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? <Loader2 className="w-6 h-6 animate-spin" /> : <Activity className="w-6 h-6" />}
              {isAnalyzing ? 'Analyzing road image...' : 'Analyze Road'}
            </button>
          ) : (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              {analysisResult.potholeDetected ? (
                <AIResultCard 
                  confidence={analysisResult.confidence}
                  severity={analysisResult.estimatedSeverity}
                  estimatedSize={analysisResult.estimatedSize}
                  riskScore={calculateRiskScore({
                    severity: analysisResult.estimatedSeverity,
                    aiConfidence: analysisResult.confidence,
                    estimatedSize: analysisResult.estimatedSize,
                    trafficLevel: 'MEDIUM',
                    locationType: 'LOCAL_ROAD',
                    reportFrequency: 0,
                    weatherRisk: 'LOW'
                  }).score}
                  riskLevel={calculateRiskScore({
                    severity: analysisResult.estimatedSeverity,
                    aiConfidence: analysisResult.confidence,
                    estimatedSize: analysisResult.estimatedSize,
                    trafficLevel: 'MEDIUM',
                    locationType: 'LOCAL_ROAD',
                    reportFrequency: 0,
                    weatherRisk: 'LOW'
                  }).level}
                  riskFactors={calculateRiskScore({
                    severity: analysisResult.estimatedSeverity,
                    aiConfidence: analysisResult.confidence,
                    estimatedSize: analysisResult.estimatedSize,
                    trafficLevel: 'MEDIUM',
                    locationType: 'LOCAL_ROAD',
                    reportFrequency: 0,
                    weatherRisk: 'LOW'
                  }).factors}
                  isDemo={aiMode === 'demo'}
                />
              ) : (
                <div className="border border-green-200 rounded-xl overflow-hidden bg-green-50 p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <h3 className="font-bold text-green-800 text-lg mb-1">{analysisResult.explanation || 'No pothole detected.'}</h3>
                  <p className="text-green-700 text-sm">Confidence: {analysisResult.confidence}%</p>
                  <p className="text-gray-600 mt-4 text-sm">The AI did not identify critical road damage in this image. Submission is disabled.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Step 4: Submit */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{submitError}</p>
          </div>
        )}

        {duplicateWarning && (
          <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-lg text-sm flex flex-col gap-2 shadow-sm animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-600" />
              <div>
                <strong className="block mb-1 text-orange-900 text-base">Possible Duplicate Detected</strong>
                <p>A similar unresolved road-damage report already exists nearby this location.</p>
              </div>
            </div>
            <div className="mt-2 ml-8">
              <button 
                onClick={() => handleSubmit(true)}
                className="px-4 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors"
              >
                Submit Anyway
              </button>
            </div>
          </div>
        )}

        <div className="pt-4 pb-12">
          <button
            onClick={() => handleSubmit(false)}
            disabled={!analysisResult?.potholeDetected || isSubmitting || (duplicateWarning && !isSubmitting)}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed shadow-md hover:shadow-lg disabled:shadow-none"
          >
            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <ArrowRight className="w-6 h-6" />}
            {isSubmitting ? 'Submitting to Authority...' : 'Submit Report'}
          </button>
        </div>
      </div>
    </div>
  );
};
