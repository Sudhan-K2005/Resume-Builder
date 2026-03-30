import { motion } from "framer-motion";
import { Car, Bike } from "lucide-react";

interface VehicleProgressProps {
  step: number;
  totalSteps: number;
}

const VehicleProgress = ({ step, totalSteps }: VehicleProgressProps) => {
  const progress = (step / (totalSteps - 1)) * 100;

  return (
    <div className="relative w-full h-16 flex items-center mb-12 px-4">
      {/* Glow Base */}
      <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full" />
      
      {/* Track */}
      <div className="absolute left-0 right-0 h-1.5 bg-white/5 dark:bg-white/5 rounded-full overflow-hidden mx-4">
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 shadow-[0_0_20px_rgba(139,92,246,0.8)]"
        />
      </div>

      {/* Vehicle Indicator */}
      <motion.div
        animate={{ 
          left: `calc(${progress}% - 24px)`,
          rotate: [0, -8, 8, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{ 
          left: { type: "spring", stiffness: 100, damping: 20 },
          rotate: { duration: 0.4, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 0.2 }
        }}
        className="absolute z-10 p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-[0_0_25px_rgba(99,102,241,0.6)] flex items-center justify-center border border-white/30"
      >
        <motion.div
          animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 bg-indigo-400/50 rounded-2xl filter blur-xl"
        />
        <div className="relative z-20">
          {step % 2 === 0 ? (
            <Car className="w-6 h-6 text-white" />
          ) : (
            <Bike className="w-6 h-6 text-white" />
          )}
        </div>
      </motion.div>

      {/* Goal Flag */}
      <motion.div 
        animate={{ 
          scale: step === totalSteps - 1 ? [1, 1.6, 1.3] : 1,
          rotate: step === totalSteps - 1 ? [0, 15, -15, 0] : 0
        }}
        className="absolute right-4 text-2xl filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
      >
        🏁
      </motion.div>
    </div>
  );
};

export default VehicleProgress;
