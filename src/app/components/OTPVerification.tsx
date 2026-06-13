import { useState } from 'react';
import { ArrowLeft, Recycle, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { toast } from 'sonner@2.0.3';

interface OTPVerificationProps {
  onSuccess: (pointsEarned: number) => void;
  onCancel: () => void;
}

export function OTPVerification({ onSuccess, onCancel }: OTPVerificationProps) {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const correctOTP = '123456';
  const pointsToEarn = 85;

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    setIsVerifying(true);
    
    // Simulate verification
    setTimeout(() => {
      if (otp === correctOTP) {
        setIsSuccess(true);
        toast.success(`${pointsToEarn} points earned!`);
        setTimeout(() => {
          onSuccess(pointsToEarn);
        }, 2000);
      } else {
        toast.error('Invalid OTP. Try: 123456');
        setIsVerifying(false);
        setOtp('');
      }
    }, 1500);
  };

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-blue-500 to-cyan-600 p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-white">Verify Deposit</h2>
      </div>

      {!isSuccess ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Machine Icon */}
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
            <Recycle className="w-12 h-12 text-white" />
          </div>

          <Card className="bg-white/95 backdrop-blur-sm p-6 w-full border-0 shadow-xl">
            <h3 className="text-center mb-2 text-gray-800">Vendor Machine #VM2401</h3>
            <p className="text-center text-gray-600 mb-6">
              Enter the OTP displayed on the vendor machine to confirm your deposit
            </p>

            {/* OTP Input */}
            <div className="flex justify-center mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200 shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(59, 130, 246, 0.05) 10px, rgba(59, 130, 246, 0.05) 20px)`
                }}>
                </div>
                <div className="relative">
                  <p className="text-center text-blue-700 mb-3 text-xs uppercase tracking-wide">Enter OTP Code</p>
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-center text-gray-700">
                <span className="text-green-600">+{pointsToEarn} points</span> will be credited
              </p>
              <p className="text-center text-gray-500 text-xs mt-1">
                ~0.5kg plastic waste detected
              </p>
            </div>

            <Button
              onClick={handleVerify}
              disabled={isVerifying || otp.length !== 6}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isVerifying ? 'Verifying...' : 'Verify & Earn Points'}
            </Button>

            <p className="text-center text-gray-500 text-xs mt-4">
              Demo OTP: 123456
            </p>
          </Card>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 animate-bounce">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </div>
          <h2 className="text-white mb-2">Success!</h2>
          <p className="text-white/90 text-center">
            {pointsToEarn} points added to your account
          </p>
        </div>
      )}
    </div>
  );
}
