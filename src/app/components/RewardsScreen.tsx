import { useState } from 'react';
import { ArrowLeft, Smartphone, Wallet, UtensilsCrossed, ShoppingBag, Car, Store, Gift } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RewardCard } from './RewardCard';
import { Badge } from './ui/badge';
import { MobileRechargeDialog } from './MobileRechargeDialog';
import { CashRewardDialog } from './CashRewardDialog';
import { CouponDialog } from './CouponDialog';
import type { ConnectedAccounts } from '../App';

interface RewardsScreenProps {
  userPoints: number;
  connectedAccounts: ConnectedAccounts;
  onRedeem: (points: number, description: string) => void;
  onBack: () => void;
}

type RewardType = 'mobile' | 'bkash' | 'nagad' | 'coupon';

interface SelectedReward {
  type: RewardType;
  title: string;
  description: string;
  points: number;
}

export function RewardsScreen({ userPoints, connectedAccounts, onRedeem, onBack }: RewardsScreenProps) {
  const [selectedReward, setSelectedReward] = useState<SelectedReward | null>(null);

  const handleRewardClick = (type: RewardType, title: string, description: string, points: number) => {
    setSelectedReward({ type, title, description, points });
  };

  const handleCloseDialog = () => {
    setSelectedReward(null);
  };

  return (
    <div className="min-h-[600px] bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-white">Rewards</h2>
          </div>
          <Badge className="bg-white text-purple-600">
            {userPoints.toLocaleString()} pts
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 -mt-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full bg-white shadow-md grid grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mobile">Mobile</TabsTrigger>
            <TabsTrigger value="cash">Cash</TabsTrigger>
            <TabsTrigger value="coupons">Coupons</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-3">
            <h3 className="text-gray-700 px-2">Mobile Recharge</h3>
            <RewardCard
              icon={<Smartphone className="w-6 h-6 text-blue-600" />}
              title="Grameenphone 50 TK"
              description="Mobile balance recharge"
              points={250}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('mobile', 'Grameenphone 50 TK', 'Mobile balance recharge', 250)}
              gradient="from-blue-500 to-cyan-500"
            />
            <RewardCard
              icon={<Smartphone className="w-6 h-6 text-orange-600" />}
              title="Robi 100 TK"
              description="Mobile balance recharge"
              points={500}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('mobile', 'Robi 100 TK', 'Mobile balance recharge', 500)}
              gradient="from-orange-500 to-red-500"
            />

            <h3 className="text-gray-700 px-2 pt-4">Cash Rewards</h3>
            <RewardCard
              icon={<Wallet className="w-6 h-6 text-pink-600" />}
              title="bKash 50 TK"
              description="Direct cashback to bKash"
              points={300}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('bkash', 'bKash 50 TK', 'Direct cashback to bKash', 300)}
              gradient="from-pink-500 to-rose-500"
            />
            <RewardCard
              icon={<Wallet className="w-6 h-6 text-orange-600" />}
              title="Nagad 100 TK"
              description="Direct cashback to Nagad"
              points={600}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('nagad', 'Nagad 100 TK', 'Direct cashback to Nagad', 600)}
              gradient="from-orange-500 to-amber-500"
            />

            <h3 className="text-gray-700 px-2 pt-4">Food & Dining</h3>
            <RewardCard
              icon={<UtensilsCrossed className="w-6 h-6 text-red-600" />}
              title="KFC 20% Off"
              description="Discount on any KFC combo"
              points={400}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('coupon', 'KFC 20% Off', 'Discount on any KFC combo', 400)}
              gradient="from-red-500 to-rose-500"
            />
            <RewardCard
              icon={<UtensilsCrossed className="w-6 h-6 text-yellow-600" />}
              title="Pizza Hut 100 TK Off"
              description="On orders above 500 TK"
              points={500}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('coupon', 'Pizza Hut 100 TK Off', 'On orders above 500 TK', 500)}
              gradient="from-yellow-500 to-orange-500"
            />

            <h3 className="text-gray-700 px-2 pt-4">Supermarkets</h3>
            <RewardCard
              icon={<Store className="w-6 h-6 text-green-600" />}
              title="Shwapno 200 TK"
              description="Shopping voucher"
              points={1000}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('coupon', 'Shwapno 200 TK', 'Shopping voucher', 1000)}
              gradient="from-green-500 to-emerald-500"
            />
            <RewardCard
              icon={<Store className="w-6 h-6 text-blue-600" />}
              title="Meena Bazar 15% Off"
              description="On grocery shopping"
              points={750}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('coupon', 'Meena Bazar 15% Off', 'On grocery shopping', 750)}
              gradient="from-blue-500 to-indigo-500"
            />

            <h3 className="text-gray-700 px-2 pt-4">Ride Sharing</h3>
            <RewardCard
              icon={<Car className="w-6 h-6 text-green-600" />}
              title="Pathao 50 TK"
              description="Ride voucher"
              points={300}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('coupon', 'Pathao 50 TK', 'Ride voucher', 300)}
              gradient="from-green-500 to-teal-500"
            />
            <RewardCard
              icon={<Car className="w-6 h-6 text-red-600" />}
              title="Uber 100 TK"
              description="Ride voucher"
              points={600}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('coupon', 'Uber 100 TK', 'Ride voucher', 600)}
              gradient="from-red-500 to-pink-500"
            />

            <h3 className="text-gray-700 px-2 pt-4">E-Commerce</h3>
            <RewardCard
              icon={<ShoppingBag className="w-6 h-6 text-orange-600" />}
              title="Daraz 25% Off"
              description="On electronics"
              points={800}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('coupon', 'Daraz 25% Off', 'On electronics', 800)}
              gradient="from-orange-500 to-red-500"
            />
            <RewardCard
              icon={<ShoppingBag className="w-6 h-6 text-purple-600" />}
              title="Pickaboo 500 TK"
              description="Shopping voucher"
              points={2500}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('coupon', 'Pickaboo 500 TK', 'Shopping voucher', 2500)}
              gradient="from-purple-500 to-indigo-500"
            />
          </TabsContent>

          <TabsContent value="mobile" className="mt-4 space-y-3">
            <RewardCard
              icon={<Smartphone className="w-6 h-6 text-blue-600" />}
              title="Grameenphone 50 TK"
              description="Mobile balance recharge"
              points={250}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('mobile', 'Grameenphone 50 TK', 'Mobile balance recharge', 250)}
              gradient="from-blue-500 to-cyan-500"
            />
            <RewardCard
              icon={<Smartphone className="w-6 h-6 text-orange-600" />}
              title="Robi 100 TK"
              description="Mobile balance recharge"
              points={500}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('mobile', 'Robi 100 TK', 'Mobile balance recharge', 500)}
              gradient="from-orange-500 to-red-500"
            />
            <RewardCard
              icon={<Smartphone className="w-6 h-6 text-yellow-600" />}
              title="Banglalink 30 TK"
              description="Mobile balance recharge"
              points={150}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('mobile', 'Banglalink 30 TK', 'Mobile balance recharge', 150)}
              gradient="from-yellow-500 to-orange-500"
            />
          </TabsContent>

          <TabsContent value="cash" className="mt-4 space-y-3">
            <RewardCard
              icon={<Wallet className="w-6 h-6 text-pink-600" />}
              title="bKash 50 TK"
              description="Direct cashback to bKash"
              points={300}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('bkash', 'bKash 50 TK', 'Direct cashback to bKash', 300)}
              gradient="from-pink-500 to-rose-500"
            />
            <RewardCard
              icon={<Wallet className="w-6 h-6 text-orange-600" />}
              title="Nagad 100 TK"
              description="Direct cashback to Nagad"
              points={600}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('nagad', 'Nagad 100 TK', 'Direct cashback to Nagad', 600)}
              gradient="from-orange-500 to-amber-500"
            />
            <RewardCard
              icon={<Wallet className="w-6 h-6 text-green-600" />}
              title="Rocket 75 TK"
              description="Direct cashback to Rocket"
              points={450}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('coupon', 'Rocket 75 TK', 'Direct cashback to Rocket', 450)}
              gradient="from-green-500 to-emerald-500"
            />
          </TabsContent>

          <TabsContent value="coupons" className="mt-4 space-y-3">
            <RewardCard
              icon={<UtensilsCrossed className="w-6 h-6 text-red-600" />}
              title="KFC 20% Off"
              description="Discount on any KFC combo"
              points={400}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('coupon', 'KFC 20% Off', 'Discount on any KFC combo', 400)}
              gradient="from-red-500 to-rose-500"
            />
            <RewardCard
              icon={<Store className="w-6 h-6 text-green-600" />}
              title="Shwapno 200 TK"
              description="Shopping voucher"
              points={1000}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('coupon', 'Shwapno 200 TK', 'Shopping voucher', 1000)}
              gradient="from-green-500 to-emerald-500"
            />
            <RewardCard
              icon={<Car className="w-6 h-6 text-green-600" />}
              title="Pathao 50 TK"
              description="Ride voucher"
              points={300}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('coupon', 'Pathao 50 TK', 'Ride voucher', 300)}
              gradient="from-green-500 to-teal-500"
            />
            <RewardCard
              icon={<ShoppingBag className="w-6 h-6 text-orange-600" />}
              title="Daraz 25% Off"
              description="On electronics"
              points={800}
              userPoints={userPoints}
              onRedeemClick={() => handleRewardClick('coupon', 'Daraz 25% Off', 'On electronics', 800)}
              gradient="from-orange-500 to-red-500"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      {selectedReward?.type === 'mobile' && (
        <MobileRechargeDialog
          isOpen={true}
          onClose={handleCloseDialog}
          rewardTitle={selectedReward.title}
          rewardPoints={selectedReward.points}
          connectedAccounts={connectedAccounts}
          onRedeem={onRedeem}
        />
      )}

      {selectedReward?.type === 'bkash' && (
        <CashRewardDialog
          isOpen={true}
          onClose={handleCloseDialog}
          rewardTitle={selectedReward.title}
          rewardPoints={selectedReward.points}
          rewardType="bkash"
          connectedAccounts={connectedAccounts}
          onRedeem={onRedeem}
        />
      )}

      {selectedReward?.type === 'nagad' && (
        <CashRewardDialog
          isOpen={true}
          onClose={handleCloseDialog}
          rewardTitle={selectedReward.title}
          rewardPoints={selectedReward.points}
          rewardType="nagad"
          connectedAccounts={connectedAccounts}
          onRedeem={onRedeem}
        />
      )}

      {selectedReward?.type === 'coupon' && (
        <CouponDialog
          isOpen={true}
          onClose={handleCloseDialog}
          rewardTitle={selectedReward.title}
          rewardDescription={selectedReward.description}
          rewardPoints={selectedReward.points}
          onRedeem={onRedeem}
        />
      )}
    </div>
  );
}
