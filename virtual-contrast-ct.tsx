import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, Download, Moon, Sun, ZoomIn, ZoomOut, RotateCcw, Loader, User, FileImage, AlertCircle, CheckCircle, Eye, Activity, Zap, Brain, Sparkles, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

// Enhanced Mock API service with more realistic responses
const apiService = {
  async processVirtualContrast(file, patientId) {
    // Simulate progressive AI processing stages
    const stages = [
      'Analyzing image structure...',
      'Identifying tissue types...',
      'Generating contrast enhancement...',
      'Optimizing image quality...',
      'Finalizing results...'
    ];
    
    // Simulate realistic processing time
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    return {
      enhancedImageUrl: URL.createObjectURL(file), // Using original as placeholder
      processingTime: '3.2s',
      confidence: 0.96,
      patientId: patientId,
      enhancement_quality: 'Excellent',
      tissue_detection: '12 tissue types identified',
      processing_stages: stages
    };
  }
};

// Animated Background Component
const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-1000"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
  </div>
);

// Enhanced Patient Information Component
const PatientInfo = ({ patientId, setPatientId, onSubmit, isProcessing }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8 transition-all duration-300 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
      
      <div className="relative">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-blue-500 dark:bg-blue-600 rounded-xl shadow-lg mr-4">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Patient Information</h2>
            <p className="text-gray-600 dark:text-gray-300">Secure patient identification for medical imaging</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="relative">
            <label htmlFor="patientId" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Patient ID <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="patientId"
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Enter patient identifier (e.g., PAT-2024-001)"
                className={`w-full px-4 py-4 border-2 rounded-xl shadow-sm transition-all duration-300 dark:bg-gray-700/50 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                  focused || patientId
                    ? 'border-blue-500 dark:border-blue-400 ring-4 ring-blue-500/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isProcessing}
              />
              {patientId && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Activity className="w-4 h-4 text-blue-500" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Eye className="w-4 h-4 text-green-500" />
              <span>Secure Processing</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Fast Analysis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced File Upload Component with better animations
const FileUpload = ({ onFileSelect, selectedFile, isProcessing }) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const container = useRef();

  useGSAP(
    () => {
      if (isDragOver) {
        gsap.to('.drop-zone', {
          scale: 1.05,
          borderColor: '#3b82f6', // blue-500
          backgroundColor: '#eff6ff', // blue-50
          duration: 0.3,
        });
      } else {
        gsap.to('.drop-zone', {
          scale: 1,
          borderColor: '#d1d5db', // gray-300
          backgroundColor: 'transparent',
          duration: 0.3,
        });
      }
    },
    { scope: container, dependencies: [isDragOver] }
  );

  useGSAP(() => {
    if (uploadProgress > 0) {
        gsap.to('.progress-bar', {
            width: `${uploadProgress}%`,
            duration: 0.5,
            ease: 'power2.inOut'
        });
    }
  }, { scope: container, dependencies: [uploadProgress]});

  useGSAP(() => {
    if (selectedFile) {
        const tl = gsap.timeline();
        tl.fromTo('.success-check', {scale: 0.5, opacity: 0}, {scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)'})
          .fromTo('.success-sparkles', {scale: 0, opacity: 0}, {scale: 1, opacity: 1, duration: 0.5, stagger: 0.1}, "-=0.3")
          .fromTo('.file-info', {y: 20, opacity: 0}, {y: 0, opacity: 1, duration: 0.5, ease: 'power2.out'}, "-=0.3");
    }
  }, { scope: container, dependencies: [selectedFile]});

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/dicom'];
      const isDicom = file.name.toLowerCase().endsWith('.dcm');
      
      if (validTypes.includes(file.type) || isDicom) {
        // Simulate upload progress
        setUploadProgress(0);
        const interval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 10;
          });
        }, 100);
        
        setTimeout(() => {
          onFileSelect(file);
          setUploadProgress(0);
        }, 1100); // Increased timeout to allow progress bar animation to finish
      } else {
        alert('Please select a valid CT scan file (DICOM, PNG, or JPEG)');
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      const fakeEvent = { target: { files: [file] } };
      handleFileChange(fakeEvent);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div ref={container} className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8 transition-all duration-300 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-2xl"></div>
      
      <div className="relative">
        <div className="flex items-center mb-6">
          <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg mr-4">
            <FileImage className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">CT Scan Upload</h2>
            <p className="text-gray-600 dark:text-gray-300">Upload your medical imaging files for AI analysis</p>
          </div>
        </div>

        <div
          className={`drop-zone relative border-2 border-dashed rounded-2xl p-12 text-center transition-colors duration-300 ${
            isProcessing
              ? 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-750'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-900/20 cursor-pointer'
          } ${selectedFile ? 'border-green-400 dark:border-green-500 bg-green-50 dark:bg-green-900/20' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
        >
          <div className="relative">
            {uploadProgress > 0 && uploadProgress < 100 ? (
              <div className="space-y-4">
                <Loader className="w-16 h-16 mx-auto text-blue-500 animate-spin" />
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="progress-bar bg-blue-500 h-2 rounded-full"
                    style={{ width: `0%` }} // initial width set to 0, GSAP will handle it
                  ></div>
                </div>
                <p className="text-blue-600 dark:text-blue-400 font-medium">Uploading... {uploadProgress}%</p>
              </div>
            ) : selectedFile ? (
              <div className="space-y-4">
                <div className="relative">
                  <CheckCircle className="success-check w-16 h-16 mx-auto text-green-500" />
                  <Sparkles className="success-sparkles w-6 h-6 absolute top-0 right-1/2 transform translate-x-8 text-yellow-400" />
                </div>
                <div className="file-info bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border">
                  <p className="font-bold text-gray-900 dark:text-white text-lg">{selectedFile.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for processing
                  </p>
                  <div className="flex items-center justify-center mt-3 space-x-4">
                    <div className="flex items-center text-xs text-green-600 dark:text-green-400">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Valid format
                    </div>
                    <div className="flex items-center text-xs text-blue-600 dark:text-blue-400">
                      <Brain className="w-4 h-4 mr-1" />
                      AI ready
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="relative">
                  <Upload className={`w-20 h-20 mx-auto transition-all duration-300 ${
                    isDragOver ? 'text-blue-500 scale-110' : 'text-gray-400 dark:text-gray-500'
                  }`} />
                  {isDragOver && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 border-4 border-blue-500 rounded-full animate-ping opacity-50"></div>
                    </div>
                  )}
                </div>
                
                <div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {isDragOver ? 'Drop your CT scan here!' : 'Drop your CT scan here or click to browse'}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Supports DICOM (.dcm), PNG, and JPEG files up to 100MB
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                    <div className="flex items-center justify-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                      <FileImage className="w-4 h-4" />
                      <span>DICOM</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                      <FileImage className="w-4 h-4" />
                      <span>PNG</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                      <FileImage className="w-4 h-4" />
                      <span>JPEG</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".dcm,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="hidden"
              disabled={isProcessing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Image Viewer with better controls
const ImageViewer = ({ imageUrl, title, isOriginal = false, onDownload }) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef();

  useGSAP(() => {
    gsap.to(imageRef.current, {
      scale: zoom,
      x: position.x,
      y: position.y,
      duration: 0.5,
      ease: 'power3.out'
    });
  }, { dependencies: [zoom, position] });

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.25, 8));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.25, 0.1));
  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transition-all duration-300 hover:shadow-3xl">
      <div className={`absolute inset-0 ${isOriginal ? 'bg-gradient-to-br from-blue-500/5 to-cyan-500/5' : 'bg-gradient-to-br from-purple-500/5 to-pink-500/5'} rounded-2xl`}></div>
      
      {/* Header */}
      <div className="relative flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="flex items-center">
          <div className={`p-2 rounded-lg mr-3 ${isOriginal ? 'bg-blue-500' : 'bg-purple-500'}`}>
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {isOriginal ? 'Original medical scan' : 'AI-enhanced with virtual contrast'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
              disabled={zoom <= 0.1}
            >
              <ZoomOut className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 min-w-[60px] text-center px-2">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
              disabled={zoom >= 8}
            >
              <ZoomIn className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          
          <button
            onClick={handleReset}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Reset view"
          >
            <RotateCcw className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>
          
          {!isOriginal && onDownload && (
            <button
              onClick={onDownload}
              className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors shadow-lg"
              title="Download enhanced scan"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      
      {/* Image Container */}
      <div 
        className="relative h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {imageUrl ? (
          <div className="relative w-full h-full">
            <img
              ref={imageRef}
              src={imageUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-contain"
              style={{
                cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
              }}
              draggable={false}
            />
            
            {/* Image overlay effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className={`absolute inset-0 ${isOriginal ? '' : 'shadow-inner'}`}></div>
              {!isOriginal && (
                <div className="absolute top-4 right-4">
                  <div className="bg-purple-500/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                    AI Enhanced
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <FileImage className="w-20 h-20 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No image available</p>
              <p className="text-sm">Upload a CT scan to view here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Processing Status with stages
const ProcessingStatus = ({ isProcessing, result }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const stages = [
    'Analyzing image structure...',
    'Identifying tissue types...',
    'Generating contrast enhancement...',
    'Optimizing image quality...',
    'Finalizing results...'
  ];
  const container = useRef();

  useGSAP(() => {
    if (isProcessing) {
        const tl = gsap.timeline({repeat: -1});
        tl.to('.progress-bar-inner', { width: '100%', duration: 4, ease: 'power1.inOut' })
          .to('.sparkle', { y: -20, stagger: 0.2, duration: 0.5, ease: 'power2.out' })
          .to('.sparkle', { opacity: 0, duration: 0.5 }, "-=0.5");

        const stageTl = gsap.timeline({repeat: -1, repeatDelay: 1});
        stages.forEach((stage, index) => {
            stageTl.to('.stage-text', {
                onStart: () => setCurrentStage(index),
                duration: 0.01 // Use a very short duration to trigger onStart
            }, index * 0.8)
        });

    } else {
      gsap.killTweensOf(['.progress-bar-inner', '.sparkle', '.stage-text']);
    }
  }, { scope: container, dependencies: [isProcessing] });

  useGSAP(() => {
    if (result) {
        gsap.fromTo('.result-card', {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        });
    }
  }, { scope: container, dependencies: [result] });

  if (!isProcessing && !result) return null;

  return (
    <div ref={container} className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"></div>
      
      <div className="relative">
        <div className="flex items-center mb-6">
          {isProcessing ? (
            <>
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg mr-4">
                <Brain className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AI Processing in Progress</h3>
                <p className="text-gray-600 dark:text-gray-300">Advanced neural networks analyzing your CT scan</p>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg mr-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Processing Complete</h3>
                <p className="text-gray-600 dark:text-gray-300">Virtual contrast enhancement successfully generated</p>
              </div>
            </>
          )}
        </div>

        {isProcessing ? (
          <div className="space-y-6">
            <div className="relative">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div className="progress-bar-inner bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <div className="absolute -top-1 left-3/4 transform -translate-x-1/2">
                <Sparkles className="sparkle w-6 h-6 text-purple-500" />
              </div>
            </div>
            
            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-xl p-4">
              <p className="stage-text text-indigo-700 dark:text-indigo-300 font-medium text-center">
                {stages[currentStage]}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Deep Learning', 'Neural Analysis', 'Image Enhancement', 'Quality Optimization'].map((process, index) => (
                <div key={index} className={`text-center p-3 rounded-lg transition-all duration-500 ${
                  index <= currentStage ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                  <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                    index <= currentStage ? 'bg-purple-500 text-white' : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
                  }`}>
                    {index <= currentStage ? <CheckCircle className="w-4 h-4" /> : <div className="w-2 h-2 bg-current rounded-full"></div>}
                  </div>
                  <p className="text-xs font-medium">{process}</p>
                </div>
              ))}
            </div>
          </div>
        ) : result && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="result-card bg-green-50 dark:bg-green-900/30 rounded-xl p-4 text-center">
              <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-semibold text-green-700 dark:text-green-300">Processing Time</p>
              <p className="text-2xl font-bold text-green-800 dark:text-green-200">{result.processingTime}</p>
            </div>
            
            <div className="result-card bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center">
              <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold text-blue-700 dark:text-blue-300">Confidence</p>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{(result.confidence * 100).toFixed(1)}%</p>
            </div>
            
            <div className="result-card bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center">
              <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="font-semibold text-purple-700 dark:text-purple-300">Quality</p>
              <p className="text-lg font-bold text-purple-800 dark:text-purple-200">{result.enhancement_quality}</p>
            </div>
            
            <div className="result-card bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 text-center">
              <Eye className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <p className="font-semibold text-orange-700 dark:text-orange-300">Detection</p>
              <p className="text-sm font-bold text-orange-800 dark:text-orange-200">{result.tissue_detection}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Application Component with enhanced styling
const VirtualContrastCT = () => {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode for medical use
  const [patientId, setPatientId] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImageUrl, setOriginalImageUrl] = useState('');
  const [enhancedImageUrl, setEnhancedImageUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingResult, setProcessingResult] = useState(null);
  const [error, setError] = useState('');
  const mainContainer = useRef();

  useGSAP(() => {
    gsap.fromTo('.main-content > *', {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
    });
  }, { scope: mainContainer });

  useGSAP(() => {
    if (error) {
        gsap.fromTo('.error-message', {
            opacity: 0,
            y: -20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'bounce.out'
        });
    }
  }, { scope: mainContainer, dependencies: [error] });


  const handleFileSelect = useCallback((file) => {
    setSelectedFile(file);
    setOriginalImageUrl(URL.createObjectURL(file));
    setEnhancedImageUrl('');
    setProcessingResult(null);
    setError('');
  }, []);

  const handleProcessScan = async () => {
    if (!selectedFile || !patientId.trim()) {
      setError('Please provide patient ID and select a CT scan file');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const result = await apiService.processVirtualContrast(selectedFile, patientId);
      setEnhancedImageUrl(result.enhancedImageUrl);
      setProcessingResult(result);
    } catch (err) {
      setError('Failed to process CT scan. Please try again.');
      console.error('Processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadEnhanced = () => {
    if (enhancedImageUrl && selectedFile) {
      const link = document.createElement('a');
      link.href = enhancedImageUrl;
      link.download = `enhanced_${selectedFile.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <AnimatedBackground />
      
      {/* Enhanced Header */}
      <header className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-xl border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mr-4">
                <FileImage className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Virtual Contrast CT
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">AI-powered medical imaging enhancement</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center space-x-1">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span>System Online</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Brain className="w-4 h-4 text-purple-500" />
                  <span>AI Ready</span>
                </div>
              </div>
              
              <button
                onClick={toggleDarkMode}
                className="p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main ref={mainContainer} className="main-content relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="error-message bg-red-50/90 dark:bg-red-900/30 backdrop-blur-sm border border-red-200 dark:border-red-700 rounded-2xl p-6 mb-8 shadow-lg">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 mr-3" />
              <div>
                <h4 className="font-semibold text-red-800 dark:text-red-200">Processing Error</h4>
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Patient Information */}
        <PatientInfo
          patientId={patientId}
          setPatientId={setPatientId}
          isProcessing={isProcessing}
        />

        {/* File Upload */}
        <FileUpload
          onFileSelect={handleFileSelect}
          selectedFile={selectedFile}
          isProcessing={isProcessing}
        />

        {/* Enhanced Process Button */}
        {selectedFile && patientId && !isProcessing && !enhancedImageUrl && (
          <div className="text-center mb-8">
            <button
              onClick={handleProcessScan}
              className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative flex items-center space-x-3">
                <Brain className="w-6 h-6" />
                <span>Generate Virtual Contrast</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        )}

        {/* Processing Status */}
        <ProcessingStatus isProcessing={isProcessing} result={processingResult} />

        {/* Image Comparison */}
        {originalImageUrl && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <ImageViewer
              imageUrl={originalImageUrl}
              title="Original CT Scan"
              isOriginal={true}
            />
            
            {enhancedImageUrl && (
              <ImageViewer
                imageUrl={enhancedImageUrl}
                title="Virtual Contrast Enhanced"
                onDownload={handleDownloadEnhanced}
              />
            )}
          </div>
        )}

        {/* Enhanced Getting Started Section */}
        {!selectedFile && (
          <div className="relative bg-gradient-to-br from-blue-50/80 to-indigo-100/80 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-blue-200/50 dark:border-blue-700/50">
            <div className="absolute top-6 right-6">
              <Sparkles className="w-8 h-8 text-blue-500/30 animate-pulse" />
            </div>
            
            <div className="max-w-4xl">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg mr-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  AI-Powered Medical Imaging Enhancement
                </h3>
              </div>
              
              <p className="text-lg text-blue-800 dark:text-blue-200 mb-8 leading-relaxed">
                Transform your non-contrast CT scans into virtual contrast-enhanced images using advanced artificial intelligence. 
                Our cutting-edge neural networks analyze tissue characteristics and generate clinically relevant contrast enhancement.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { icon: User, title: 'Patient ID', desc: 'Enter secure patient identifier', step: '1' },
                  { icon: Upload, title: 'Upload Scan', desc: 'DICOM, PNG, or JPEG format', step: '2' },
                  { icon: Brain, title: 'AI Processing', desc: 'Advanced neural analysis', step: '3' },
                  { icon: Eye, title: 'Compare', desc: 'Side-by-side comparison', step: '4' },
                  { icon: Download, title: 'Download', desc: 'Enhanced scan results', step: '5' }
                ].map((item, index) => (
                  <div key={index} className="relative group">
                    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 dark:border-gray-700/50 transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {item.step}
                      </div>
                      <item.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-3" />
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                    </div>
                    {index < 4 && (
                      <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 translate-x-full">
                        <ArrowRight className="w-4 h-4 text-blue-400" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {enhancedImageUrl && processingResult && (
          <div className="bg-gradient-to-r from-green-50/80 to-emerald-100/80 dark:from-green-900/20 dark:to-emerald-900/20 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-200/50 dark:border-green-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg mr-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-900 dark:text-green-100">
                    Virtual Contrast Enhancement Complete!
                  </h3>
                  <p className="text-green-700 dark:text-green-200">
                    Your CT scan has been successfully processed and enhanced with AI-generated virtual contrast.
                  </p>
                </div>
              </div>
              <div className="hidden md:block">
                <Sparkles className="w-12 h-12 text-green-500/50 animate-bounce" />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VirtualContrastCT;