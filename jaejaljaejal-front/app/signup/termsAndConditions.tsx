import React from "react";

interface TermsAndConditionsProps {
  agreed: boolean;
  onAgreeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({
  agreed,
  onAgreeChange,
}) => {
  return (
    <div className="flex flex-col w-96 space-y-2">
      <div className="border border-gray-300 p-4 rounded-md">
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="agreeTerms"
            checked={agreed}
            onChange={onAgreeChange}
            required
          />
          <label htmlFor="agreeTerms" className="ml-2 cursor-pointer">
            개인정보 수집 및 이용에 동의합니다.
          </label>
        </div>
        <div className="flex flex-col text-sm text-gray-600 space-y-1">
          <p>
            <strong>수집하는 개인정보 항목:</strong> 이름, 이메일, 전화번호,
            생년월일, 성별
          </p>
          <p>
            <strong>수집 및 이용 목적:</strong> 회원 가입 의사 확인, 회원제
            서비스 제공에 따른 본인 식별 및 인증, 고지사항 전달, 고객 문의 처리
            및 불만 처리, 서비스 이용 관련 통계, 서비스 개선 및 개발을 위한 연구
          </p>
          <p>
            <strong>보유 및 이용 기간:</strong> 회원 탈퇴 시까지 보유하며, 회원
            탈퇴 시 모든 개인정보는 즉시 파기합니다. 법령에서 정한 보존 기간이
            있을 경우 그에 따릅니다.
          </p>
          <p>
            <strong>제3자 제공:</strong> 원칙적으로 이용자의 개인정보를 외부에
            제공하지 않습니다. 다만, 이용자의 동의가 있거나 법령에 따른 경우는
            예외로 합니다.
          </p>
          <p>
            <strong>동의를 거부할 권리 및 거부 시 불이익:</strong> 이용자는
            개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다. 단,
            동의를 거부할 경우 회원가입이 제한될 수 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
