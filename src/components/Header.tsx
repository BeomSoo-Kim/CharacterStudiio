/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, RefreshCw } from 'lucide-react';
import { AppStatus } from '../types';

interface HeaderProps {
  currentStatus: AppStatus;
  onNavigate: (status: AppStatus) => void;
  onReset: () => void;
}

export default function Header({ currentStatus, onNavigate, onReset }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E2D9] bg-white/95 px-4 py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        {/* 로고 영역 */}
        <button
          id="btn-header-logo"
          onClick={onReset}
          className="group flex items-center gap-2.5 text-left focus:outline-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#6B705C] text-white shadow-sm transition-transform group-hover:scale-105">
            <span className="font-serif text-lg font-bold">✨</span>
          </div>
          <div>
            <h1 className="font-serif text-[#5A5A40] text-base font-bold tracking-tight sm:text-lg">
              캐릭터 스튜디오
            </h1>
            <p className="-mt-1 font-sans text-[10px] text-[#8A8A7A]">사진 한 장으로 시작하는 그림 만들기</p>
          </div>
        </button>

        {/* 액션 버튼 그룹 */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {currentStatus !== 'home' && currentStatus !== 'generating' && (
            <button
              id="btn-header-reset"
              onClick={onReset}
              className="flex items-center gap-1 rounded-full border border-[#E5E2D9] bg-white px-3 py-1.5 text-xs font-medium text-[#6B705C] transition-colors hover:bg-[#FAF9F6]"
              title="처음으로 이동"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">처음으로</span>
            </button>
          )}

          {currentStatus !== 'guide' && currentStatus !== 'generating' && (
            <button
              id="btn-header-guide"
              onClick={() => onNavigate('guide')}
              className="flex items-center gap-1 rounded-full bg-[#F1EDE4] px-3.5 py-1.5 text-xs font-semibold text-[#6B705C] transition-colors hover:bg-[#E5E2D9]"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>사용 방법</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
