import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { ReactNode } from 'react';

interface RewardCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  points: number;
  userPoints: number;
  onRedeemClick: () => void;
  gradient: string;
}

export function RewardCard({
  icon,
  title,
  description,
  points,
  userPoints,
  onRedeemClick,
  gradient
}: RewardCardProps) {
  const canRedeem = userPoints >= points;

  const handleRedeem = () => {
    if (!canRedeem) {
      toast.error('Not enough points');
      return;
    }

    onRedeemClick();
  };

  return (
    <Card className="p-4 border-0 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
          <div className="text-white">
            {icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-gray-800 mb-1">{title}</h4>
          <p className="text-gray-500 text-xs mb-2">{description}</p>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            {points} points
          </Badge>
        </div>
        <Button
          onClick={handleRedeem}
          disabled={!canRedeem}
          size="sm"
          className={`${
            canRedeem 
              ? 'bg-purple-600 hover:bg-purple-700' 
              : 'bg-gray-300 text-gray-500'
          }`}
        >
          Redeem
        </Button>
      </div>
    </Card>
  );
}
