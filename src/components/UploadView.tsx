/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, FileImage, ShieldCheck, Home, ArrowRight, Eye, Trash2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { AppStatus } from '../types';

interface UploadViewProps {
  uploadedImage: string | null;
  imageFileName: string | null;
  imageSize: number | null;
  onImageChanged: (base64: string | null, fileName: string | null, size: number | null) => void;
  onNavigate: (status: AppStatus) => void;
  onNext: () => void;
}

export default function UploadView({
  uploadedImage,
  imageFileName,
  imageSize,
  onImageChanged,
  onNavigate,
  onNext
}: UploadViewProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 최대 허용 크기: 5MB
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const validateAndProcessFile = (file: File) => {
    setErrorMessage(null);

    // 1. 형식 체크 (JPG, JPEG, PNG 중심)
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('JPG 또는 PNG 형식의 사진을 올려주세요.');
      return;
    }

    // 2. 용량 체크 (5MB 제한)
    if (file.size > MAX_FILE_SIZE) {
      setErrorMessage('사진 용량이 너무 커요(5MB 제한). 더 작은 사진을 올려주세요.');
      return;
    }

    // 3. 파일 로드 및 Base64 인코딩
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        onImageChanged(e.target.result, file.name, file.size);
      } else {
        setErrorMessage('이미지를 읽는 중 알 수 없는 오류가 발생했습니다.');
      }
    };
    reader.onerror = () => {
      setErrorMessage('파일 읽기 에러가 발생했습니다.');
    };
    reader.readAsDataURL(file);
  };

  // Drag & Drop 이벤트 핸들러
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  // 클릭하여 파일 찾기 핸들러
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const triggerFileBrowser = () => {
    fileInputRef.current?.click();
  };

  const deletePhoto = () => {
    onImageChanged(null, null, null);
    setErrorMessage(null);
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="space-y-6">
        
        {/* 상단 안내 영역 */}
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-[#5A5A40] leading-tight">
            캐릭터로 변환할 사진 선택
          </h2>
          <p className="text-xs text-[#8A8A7A] mt-1.5 max-w-sm mx-auto">
            얼굴형이 또렷이 보이는 밝은 정면 인물 사진을 추천 드려요.
          </p>
        </div>

        {/* 에러 고지 박스 */}
        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs text-rose-800"
          >
            <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
            <span className="font-semibold">{errorMessage}</span>
          </motion.div>
        )}

        {/* 메인 업로드 상자 영역 */}
        <div
          id="upload-dropzone"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={!uploadedImage ? triggerFileBrowser : undefined}
          className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
            uploadedImage 
              ? 'border-[#6B705C] bg-[#F1EDE4]/10' 
              : isDragOver
                ? 'border-[#5A5A40] bg-[#F1EDE4] scale-[1.01]'
                : 'border-[#D1CDC0] bg-[#FAF9F6] cursor-pointer hover:bg-[#F1EDE4]/50'
          }`}
        >
          {/* 숨겨진 파일 선택 Input */}
          <input
            id="file-input"
            ref={fileInputRef}
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileChange}
            className="hidden"
          />

          {!uploadedImage ? (
            <div className="space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E5E2D9] text-[#6B705C] shadow-inner text-xl">
                📸
              </div>
              <div>
                <p className="text-sm font-bold text-[#4A4A4A]">사진을 선택하거나 이곳에 드래그하세요</p>
                <p className="text-xs text-[#8A8A7A] mt-1">파일 지원: JPG, PNG (최대 5MB 제한)</p>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-4">
              {/* 이미지 썸네일 */}
              <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-2xl border-4 border-white shadow-md">
                <img
                  src={uploadedImage}
                  alt="업로드된 원본"
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    id="btn-delete-uploaded"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePhoto();
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-600 text-white shadow hover:bg-red-700 transition-colors"
                    title="사진 지우기"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* 디테일 메타데이터 */}
              <div className="rounded-xl bg-white border border-[#E5E2D9] p-3 text-left text-xs max-w-sm mx-auto shadow-sm">
                <div className="flex justify-between items-center text-[#8A8A7A]">
                  <span className="font-semibold text-[#4A4A4A] truncate max-w-[200px]">{imageFileName}</span>
                  <span>{((imageSize || 0) / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 좋은 사진 가이드 아코디언/목록 */}
        <div className="rounded-2xl border border-[#E5E2D9] bg-[#FAF9F6] p-4.5 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#5A5A40]">
            <ShieldCheck className="h-4 w-4 text-[#6B705C]" />
            <span>이렇게 찍은 사진이 가장 예뻐요!</span>
          </div>
          <ul className="grid grid-cols-2 gap-2 text-xs text-[#6E6E60]">
            <li className="flex gap-1 items-center">✨ 이목구비가 가려짐 없이 선명</li>
            <li className="flex gap-1 items-center">👤 동반자 없이 단독 인물 1명</li>
            <li className="flex gap-1 items-center">💡 역광 없이 부드러운 전면 조명</li>
            <li className="flex gap-1 items-center">🕶️ 모자/마스크가 가리지 않은 상태</li>
          </ul>
        </div>

        {/* 제어 패널 버튼 */}
        <div className="flex gap-3 pt-2">
          <button
            id="btn-upload-home"
            onClick={() => onNavigate('home')}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl border border-[#D1CDC0] bg-white py-3.5 text-xs font-bold text-[#6B705C] transition-colors hover:bg-[#FAF9F6]"
          >
            <Home className="h-4 w-4" />
            <span>처음으로</span>
          </button>

          <button
            id="btn-upload-next"
            disabled={!uploadedImage}
            onClick={onNext}
            className={`flex flex-[2] items-center justify-center gap-1.5 rounded-2xl py-3.5 text-xs font-bold transition-all shadow-md ${
              uploadedImage
                ? 'bg-[#6B705C] text-white cursor-pointer hover:bg-[#5A5A40] active:scale-95 shadow-[#6B705C]/15'
                : 'bg-[#E5E2D9] text-[#A09E94] cursor-not-allowed shadow-none'
            }`}
          >
            <span>스타일 고르기</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
