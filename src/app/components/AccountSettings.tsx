import { useState } from 'react';
import { ArrowLeft, Smartphone, Wallet, Check, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';
import type { ConnectedAccounts } from '../App';

interface AccountSettingsProps {
  connectedAccounts: ConnectedAccounts;
  onUpdateAccounts: (accounts: ConnectedAccounts) => void;
  onBack: () => void;
}

export function AccountSettings({ connectedAccounts, onUpdateAccounts, onBack }: AccountSettingsProps) {
  const [mobileNumber, setMobileNumber] = useState(connectedAccounts.mobileNumber || '');
  const [mobileOperator, setMobileOperator] = useState(connectedAccounts.mobileOperator || '');
  const [bkashNumber, setBkashNumber] = useState(connectedAccounts.bkashNumber || '');
  const [nagadNumber, setNagadNumber] = useState(connectedAccounts.nagadNumber || '');

  const handleSaveMobile = () => {
    if (!mobileNumber || !mobileOperator) {
      toast.error('Please enter mobile number and select operator');
      return;
    }

    if (mobileNumber.length !== 11) {
      toast.error('Mobile number must be 11 digits');
      return;
    }

    onUpdateAccounts({
      ...connectedAccounts,
      mobileNumber,
      mobileOperator: mobileOperator as any
    });
    toast.success('Mobile account connected successfully!');
  };

  const handleSaveBkash = () => {
    if (!bkashNumber) {
      toast.error('Please enter bKash number');
      return;
    }

    if (bkashNumber.length !== 11) {
      toast.error('bKash number must be 11 digits');
      return;
    }

    onUpdateAccounts({
      ...connectedAccounts,
      bkashNumber
    });
    toast.success('bKash account connected successfully!');
  };

  const handleSaveNagad = () => {
    if (!nagadNumber) {
      toast.error('Please enter Nagad number');
      return;
    }

    if (nagadNumber.length !== 11) {
      toast.error('Nagad number must be 11 digits');
      return;
    }

    onUpdateAccounts({
      ...connectedAccounts,
      nagadNumber
    });
    toast.success('Nagad account connected successfully!');
  };

  return (
    <div className="min-h-[600px] bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
        <div className="flex items-center gap-3 mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-white">Connected Accounts</h2>
        </div>
        <p className="text-white/80 text-sm ml-12">
          Link your accounts to redeem rewards instantly
        </p>
      </div>

      <div className="p-6 space-y-4">
        {/* Mobile Account */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-800">Mobile Recharge</h3>
              <p className="text-gray-500 text-xs">Connect your mobile number</p>
            </div>
            {connectedAccounts.mobileNumber && (
              <Check className="w-5 h-5 text-green-600" />
            )}
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="01XXXXXXXXX"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
                maxLength={11}
              />
            </div>

            <div>
              <Label htmlFor="operator">Operator</Label>
              <Select value={mobileOperator} onValueChange={setMobileOperator}>
                <SelectTrigger id="operator">
                  <SelectValue placeholder="Select operator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grameenphone">Grameenphone</SelectItem>
                  <SelectItem value="Robi">Robi</SelectItem>
                  <SelectItem value="Banglalink">Banglalink</SelectItem>
                  <SelectItem value="Teletalk">Teletalk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSaveMobile} className="w-full bg-blue-600 hover:bg-blue-700">
              {connectedAccounts.mobileNumber ? 'Update' : 'Connect'} Mobile Account
            </Button>
          </div>
        </Card>

        {/* bKash Account */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
              <Wallet className="w-5 h-5 text-pink-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-800">bKash</h3>
              <p className="text-gray-500 text-xs">Connect your bKash account</p>
            </div>
            {connectedAccounts.bkashNumber && (
              <Check className="w-5 h-5 text-green-600" />
            )}
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="bkash">bKash Number</Label>
              <Input
                id="bkash"
                type="tel"
                placeholder="01XXXXXXXXX"
                value={bkashNumber}
                onChange={(e) => setBkashNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
                maxLength={11}
              />
            </div>

            <Button onClick={handleSaveBkash} className="w-full bg-pink-600 hover:bg-pink-700">
              {connectedAccounts.bkashNumber ? 'Update' : 'Connect'} bKash Account
            </Button>
          </div>
        </Card>

        {/* Nagad Account */}
        <Card className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Wallet className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-800">Nagad</h3>
              <p className="text-gray-500 text-xs">Connect your Nagad account</p>
            </div>
            {connectedAccounts.nagadNumber && (
              <Check className="w-5 h-5 text-green-600" />
            )}
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="nagad">Nagad Number</Label>
              <Input
                id="nagad"
                type="tel"
                placeholder="01XXXXXXXXX"
                value={nagadNumber}
                onChange={(e) => setNagadNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
                maxLength={11}
              />
            </div>

            <Button onClick={handleSaveNagad} className="w-full bg-orange-600 hover:bg-orange-700">
              {connectedAccounts.nagadNumber ? 'Update' : 'Connect'} Nagad Account
            </Button>
          </div>
        </Card>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-blue-900 text-sm">Secure Connection</p>
            <p className="text-blue-700 text-xs mt-1">
              Your account information is encrypted and secure. We'll only use it to process your reward redemptions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
