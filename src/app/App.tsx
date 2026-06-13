import { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { OTPVerification } from './components/OTPVerification';
import { RewardsScreen } from './components/RewardsScreen';
import { AccountSettings } from './components/AccountSettings';
import { Toaster } from './components/ui/sonner';

export type Screen = 'home' | 'otp' | 'rewards' | 'settings';

export interface UserData {
  points: number;
  name: string;
  transactions: Transaction[];
  connectedAccounts: ConnectedAccounts;
}

export interface ConnectedAccounts {
  mobileNumber?: string;
  mobileOperator?: 'Grameenphone' | 'Robi' | 'Banglalink' | 'Teletalk';
  bkashNumber?: string;
  nagadNumber?: string;
}

export interface Transaction {
  id: string;
  type: 'earned' | 'redeemed';
  amount: number;
  description: string;
  date: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [userData, setUserData] = useState<UserData>({
    points: 1250,
    name: 'Amin Bin Zunait',
    connectedAccounts: {},
    transactions: [
      {
        id: '1',
        type: 'earned',
        amount: 50,
        description: 'Plastic bottles deposited',
        date: '2025-11-03'
      },
      {
        id: '2',
        type: 'redeemed',
        amount: -100,
        description: 'bKash cashback',
        date: '2025-11-02'
      },
      {
        id: '3',
        type: 'earned',
        amount: 75,
        description: 'Mixed plastic waste',
        date: '2025-11-01'
      },
      {
        id: '4',
        type: 'redeemed',
        amount: -200,
        description: 'KFC discount coupon',
        date: '2025-10-31'
      },
      {
        id: '5',
        type: 'earned',
        amount: 100,
        description: 'PET bottles deposited',
        date: '2025-10-30'
      }
    ]
  });

  const handleOTPSuccess = (pointsEarned: number) => {
    setUserData(prev => ({
      ...prev,
      points: prev.points + pointsEarned,
      transactions: [
        {
          id: Date.now().toString(),
          type: 'earned',
          amount: pointsEarned,
          description: 'Plastic waste deposited',
          date: new Date().toISOString().split('T')[0]
        },
        ...prev.transactions
      ]
    }));
    setCurrentScreen('home');
  };

  const handleRedeemReward = (points: number, description: string) => {
    setUserData(prev => ({
      ...prev,
      points: prev.points - points,
      transactions: [
        {
          id: Date.now().toString(),
          type: 'redeemed',
          amount: -points,
          description: description,
          date: new Date().toISOString().split('T')[0]
        },
        ...prev.transactions
      ]
    }));
  };

  const handleUpdateAccounts = (accounts: ConnectedAccounts) => {
    setUserData(prev => ({
      ...prev,
      connectedAccounts: accounts
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        {currentScreen === 'home' && (
          <HomeScreen
            userData={userData}
            onNavigateToOTP={() => setCurrentScreen('otp')}
            onNavigateToRewards={() => setCurrentScreen('rewards')}
            onNavigateToSettings={() => setCurrentScreen('settings')}
          />
        )}
        {currentScreen === 'otp' && (
          <OTPVerification
            onSuccess={handleOTPSuccess}
            onCancel={() => setCurrentScreen('home')}
          />
        )}
        {currentScreen === 'rewards' && (
          <RewardsScreen
            userPoints={userData.points}
            connectedAccounts={userData.connectedAccounts}
            onRedeem={handleRedeemReward}
            onBack={() => setCurrentScreen('home')}
          />
        )}
        {currentScreen === 'settings' && (
          <AccountSettings
            connectedAccounts={userData.connectedAccounts}
            onUpdateAccounts={handleUpdateAccounts}
            onBack={() => setCurrentScreen('home')}
          />
        )}
      </div>
      <Toaster />
    </div>
  );
}
