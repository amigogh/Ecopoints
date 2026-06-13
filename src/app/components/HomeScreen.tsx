import { Recycle, Gift, TrendingUp, Settings } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import type { UserData } from '../App';

interface HomeScreenProps {
  userData: UserData;
  onNavigateToOTP: () => void;
  onNavigateToRewards: () => void;
  onNavigateToSettings: () => void;
}

export function HomeScreen({ userData, onNavigateToOTP, onNavigateToRewards, onNavigateToSettings }: HomeScreenProps) {
  return (
    <div className="min-h-[600px] bg-gradient-to-br from-green-500 to-emerald-600 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Recycle className="w-8 h-8 text-white" />
            <h1 className="text-white">EcoPoints</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNavigateToSettings}
            className="text-white hover:bg-white/20"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </div>
        <p className="text-green-100">Welcome back, {userData.name}!</p>
      </div>

      {/* Points Card */}
      <Card className="bg-white/95 backdrop-blur-sm p-6 mb-6 border-0 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-600 mb-1">Total Points</p>
            <h2 className="text-green-600">{userData.points.toLocaleString()}</h2>
          </div>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={onNavigateToOTP}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <Recycle className="w-4 h-4 mr-2" />
            Deposit Waste
          </Button>
          <Button 
            onClick={onNavigateToRewards}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700"
          >
            <Gift className="w-4 h-4 mr-2" />
            Rewards
          </Button>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <Card className="bg-white/90 p-4 border-0 text-center">
          <p className="text-green-600 mb-1">24</p>
          <p className="text-gray-600 text-xs">Deposits</p>
        </Card>
        <Card className="bg-white/90 p-4 border-0 text-center">
          <p className="text-green-600 mb-1">12kg</p>
          <p className="text-gray-600 text-xs">Recycled</p>
        </Card>
        <Card className="bg-white/90 p-4 border-0 text-center">
          <p className="text-green-600 mb-1">8</p>
          <p className="text-gray-600 text-xs">Rewards</p>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/90 rounded-2xl p-5">
        <h3 className="mb-4 text-gray-800">Recent Activity</h3>
        <div className="space-y-3">
          {userData.transactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'earned' 
                    ? 'bg-green-100' 
                    : 'bg-orange-100'
                }`}>
                  {transaction.type === 'earned' ? (
                    <Recycle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Gift className="w-5 h-5 text-orange-600" />
                  )}
                </div>
                <div>
                  <p className="text-gray-800">{transaction.description}</p>
                  <p className="text-gray-500 text-xs">{transaction.date}</p>
                </div>
              </div>
              <Badge 
                variant={transaction.type === 'earned' ? 'default' : 'secondary'}
                className={transaction.type === 'earned' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}
              >
                {transaction.type === 'earned' ? '+' : ''}{transaction.amount}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
