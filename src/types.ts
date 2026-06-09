/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// 3가지 캐릭터 스타일 정의
export type CharacterStyle = 'cute' | 'webtoon' | 'simple';

// 분위기 옵션 정의
export type MoodOption = 'bright' | 'calm';

// 구도 옵션 정의
export type PoseOption = 'face' | 'upperBody';

// 가상/실제 이미지 생성 상태
export type AppStatus = 'home' | 'upload' | 'style' | 'generating' | 'success' | 'error' | 'guide';

// 핵심 데이터 구조 설계
export interface CharacterMakerState {
  uploadedImage: string | null;     // 원본 사진 (Base64 데이터 URL)
  imageFileName: string | null;     // 업로드된 파일명
  imageSize: number | null;         // 업로드된 파일 크기 (Bytes)
  selectedStyle: CharacterStyle | null;  // 3가지 캐릭터 스타일 선택값
  moodOption: MoodOption;           // 분위기 옵션 (기본값 제공)
  poseOption: PoseOption;           // 구도 옵션 (기본값 제공)
  generatedImage: string | null;    // 생성된 결과 이미지 (Base64 or URL)
  createdAt?: string;               // 결과물 생성 시각
}

// 샘플 일러스트 데이터 정의 (API 생성 실패 시 또는 오프라인 데모 fallback용)
export interface CharacterSample {
  style: CharacterStyle;
  mood: MoodOption;
  pose: PoseOption;
  imageUrl: string;
}
