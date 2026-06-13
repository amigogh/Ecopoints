import { useState } from 'react';
import { Smartphone, CheckCircle2, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';
import type { ConnectedAccounts } from '../App';

interface MobileRechargeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  rewardTitle: string;
  rewardPoints: number;
  connectedAccounts: ConnectedAccounts;
  onRedeem: (points: number, description: string) => void;
}

export function MobileRechargeDialog({
  isOpen,
  onClose,
  rewardTitle,
  rewardPoints,
  connectedAccounts,
  onRedeem
}: MobileRechargeDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRedeem = () => {
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onRedeem(rewardPoints, rewardTitle);
      toast.success('Mobile recharge successful!');

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Mobile Recharge</DialogTitle>
        </DialogHeader>

        {!isSuccess ? (
          <div className="space-y-4">
            {connectedAccounts.mobileNumber ? (
              <>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-700">Recharging</p>
                      <p className="text-blue-600">{connectedAccounts.mobileNumber}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Operator</span>
                    <span className="text-gray-800">{connectedAccounts.mobileOperator}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-600">Amount</span>
                    <span className="text-gray-800">{rewardTitle}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-600">Points</span>
                    <span className="text-blue-600">{rewardPoints} pts</span>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-green-800 text-sm">
                    Balance will be credited instantly to your mobile number
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={onClose} className="flex-1" disabled={isProcessing}>
                    Cancel
                  </Button>
                  <Button onClick={handleRedeem} className="flex-1 bg-blue-600 hover:bg-blue-700" disabled={isProcessing}>
                    {isProcessing ? 'Processing...' : 'Confirm Recharge'}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-gray-800 mb-2">No Mobile Account Connected</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Please connect your mobile number in Settings to redeem mobile recharge rewards.
                </p>
                <Button onClick={onClose} className="w-full">
                  Go to Settings
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h3 className="text-gray-800 mb-2">Recharge Successful!</h3>
            <p className="text-gray-600 text-sm">
              Your mobile balance has been recharged
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
