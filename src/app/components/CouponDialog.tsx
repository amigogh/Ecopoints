import { useState } from 'react';
import { Gift, CheckCircle2, QrCode, Copy } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface CouponDialogProps {
  isOpen: boolean;
  onClose: () => void;
  rewardTitle: string;
  rewardPoints: number;
  rewardDescription: string;
  onRedeem: (points: number, description: string) => void;
}

export function CouponDialog({
  isOpen,
  onClose,
  rewardTitle,
  rewardPoints,
  rewardDescription,
  onRedeem
}: CouponDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const couponCode = 'ECO' + Math.random().toString(36).substring(2, 10).toUpperCase();

  const handleActivate = () => {
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsActivated(true);
      onRedeem(rewardPoints, rewardTitle);
      toast.success('Coupon activated successfully!');
    }, 1500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(couponCode);
    toast.success('Coupon code copied!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Redeem Coupon</DialogTitle>
        </DialogHeader>

        {!isActivated ? (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-800">{rewardTitle}</h3>
                  <p className="text-gray-600 text-xs">{rewardDescription}</p>
                </div>
              </div>
              <div className="bg-white/80 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Reward Value</span>
                  <span className="text-gray-800">{rewardTitle.match(/\d+/)?.[0]} TK</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Points Required</span>
                  <span className="text-purple-600">{rewardPoints} pts</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-900 text-sm">
                Once activated, you'll receive a unique coupon code that can be used at participating stores or online platforms.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1" disabled={isProcessing}>
                Cancel
              </Button>
              <Button 
                onClick={handleActivate} 
                className="flex-1 bg-purple-600 hover:bg-purple-700" 
                disabled={isProcessing}
              >
                {isProcessing ? 'Activating...' : 'Activate Coupon'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-gray-800 mb-1">Coupon Activated!</h3>
              <p className="text-gray-600 text-sm">
                Use this code at checkout
              </p>
            </div>

            {/* QR Code Placeholder */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-6 flex flex-col items-center">
              <div className="w-32 h-32 bg-white rounded-lg flex items-center justify-center mb-3 border-2 border-gray-300">
                <QrCode className="w-20 h-20 text-gray-600" />
              </div>
              <p className="text-gray-500 text-xs mb-3">Scan at store or use code below</p>
              
              {/* Coupon Code */}
              <div className="bg-white border-2 border-dashed border-purple-400 rounded-lg p-4 w-full">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-xs mb-1">Coupon Code</p>
                    <p className="text-purple-600 tracking-wider">{couponCode}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyCode}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-amber-900 text-xs">
                <strong>Valid for 30 days.</strong> Screenshot this code or find it in your transaction history.
              </p>
            </div>

            <Button onClick={onClose} className="w-full">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
