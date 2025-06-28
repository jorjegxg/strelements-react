import {
  DollarSign,
  Gift,
  Heart,
  MessageCircle,
  Star,
  User,
} from "lucide-react";
import useDonationStore from "./donationStore";

// Centralized color theme
const colors = {
  primary: {
    500: "#10b981",
    600: "#059669",
    700: "#047857",
  },
  secondary: {
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
  },
  dark: {
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
  light: {
    100: "#f8fafc",
    200: "#e2e8f0",
    300: "#cbd5e1",
  },
};

// Zustand store for donation state

// Recent donations data
const recentDonations = [
  {
    name: "Alex M.",
    amount: 25,
    message: "Keep up the great content!",
    time: "2 min ago",
  },
  {
    name: "Maria P.",
    amount: 10,
    message: "Love your streams! 💜",
    time: "5 min ago",
  },
  {
    name: "Anonymous",
    amount: 50,
    message: "Amazing gameplay today!",
    time: "8 min ago",
  },
  {
    name: "Radu S.",
    amount: 15,
    message: "You deserve it!",
    time: "12 min ago",
  },
];

const predefinedAmounts = [5, 10, 25, 50, 100];

const DonationPage = () => {
  const selectedAmount = useDonationStore((state) => state.selectedAmount);
  const customAmount = useDonationStore((state) => state.customAmount);
  const donorName = useDonationStore((state) => state.donorName);
  const message = useDonationStore((state) => state.message);
  const isAnonymous = useDonationStore((state) => state.isAnonymous);
  const setSelectedAmount = useDonationStore(
    (state) => state.setSelectedAmount
  );
  const setCustomAmount = useDonationStore((state) => state.setCustomAmount);
  const setDonorName = useDonationStore((state) => state.setDonorName);
  const setMessage = useDonationStore((state) => state.setMessage);
  const setIsAnonymous = useDonationStore((state) => state.setIsAnonymous);
  const resetForm = useDonationStore((state) => state.resetForm);

  const getSelectedAmount = () => {
    return selectedAmount || parseFloat(customAmount) || 0;
  };

  const handleDonate = () => {
    const amount = getSelectedAmount();
    if (amount <= 0) {
      alert("Te rog selectează o sumă validă!");
      return;
    }

    // Stripe integration would go here
    console.log("Donation data:", {
      amount,
      donorName: isAnonymous ? "Anonymous" : donorName,
      message,
      isAnonymous,
    });

    alert(`Redirecționare către Stripe pentru donația de ${amount} RON`);
    resetForm();
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 flex justify-center items-center">
          <div
            className=" inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-lg"
            style={{
              background: `linear-gradient(to right, ${colors.primary[500]}, ${colors.primary[700]})`,
            }}
          >
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="pl-4 text-4xl md:text-6xl font-bold text-white mb-4">
            Nectarians' tipping page
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Main Donation Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Gift className="mr-3" style={{ color: colors.primary[500] }} />
                Make a Donation
              </h2>

              {/* Amount Selection */}
              <div className="mb-8">
                <label className="block text-white font-semibold mb-4">
                  Select amount (USD)
                </label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedAmount(amount)}
                      className={`p-4 rounded-xl font-bold transition-all duration-200 ${
                        selectedAmount === amount
                          ? "text-white shadow-lg scale-105"
                          : "bg-slate-700/50 text-white hover:bg-slate-600/50 hover:scale-105"
                      }`}
                      style={{
                        background:
                          selectedAmount === amount
                            ? `linear-gradient(to right, ${colors.primary[500]}, ${colors.primary[600]})`
                            : "",
                      }}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Donor Info */}
              <div className="mb-8">
                <label className="block text-white font-semibold mb-4">
                  Donor information
                </label>
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Your name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      disabled={isAnonymous}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent disabled:opacity-50"
                    />
                  </div>

                  <label className="flex items-center text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="mr-3 w-4 h-4 rounded focus:ring-emerald-500"
                      style={{ color: colors.primary[600] }}
                    />
                    Anonymous donation
                  </label>
                </div>
              </div>

              {/* Message */}
              <div className="mb-8">
                <label className="block text-white font-semibold mb-4">
                  <MessageCircle className="inline mr-2 w-5 h-5" />
                  Message for streamer (optional)
                </label>
                <textarea
                  placeholder="Write an encouraging message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Donate Button */}
              <button
                onClick={handleDonate}
                className="w-full text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                style={{
                  background: `linear-gradient(to right, ${colors.primary[600]}, ${colors.primary[700]})`,
                }}
              >
                <Heart className="w-6 h-6" />
                <span>
                  Donate{" "}
                  {getSelectedAmount() > 0 ? `${getSelectedAmount()}` : ""}
                </span>
              </button>

              <p className="text-center text-slate-400 mt-4 text-sm">
                Payments are securely processed through Stripe
              </p>
            </div>
          </div>

          {/* Recent Donations Sidebar */}
          <div className="space-y-6">
            {/* Recent Donations */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Star className="mr-2" style={{ color: colors.primary[500] }} />
                Recent Donations
              </h3>

              <div className="space-y-4">
                {recentDonations.map((donation, index) => (
                  <div
                    key={index}
                    className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-white">
                        {donation.name}
                      </span>
                      <span
                        className="font-bold"
                        style={{ color: colors.secondary[500] }}
                      >
                        {donation.amount} RON
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">
                      {donation.message}
                    </p>
                    <span className="text-xs text-slate-500">
                      {donation.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Supporters */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Heart
                  className="mr-2"
                  style={{ color: colors.secondary[500] }}
                />
                Top Supporters
              </h3>

              <div className="space-y-3">
                {[
                  { name: "Alexandra M.", total: 250 },
                  { name: "Mihai R.", total: 180 },
                  { name: "Diana P.", total: 150 },
                ].map((supporter, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0
                            ? "bg-amber-500 text-amber-900"
                            : index === 1
                            ? "bg-slate-400 text-slate-900"
                            : "bg-amber-600/70 text-amber-100"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <span className="text-white ml-3">{supporter.name}</span>
                    </div>
                    <span
                      className="font-semibold"
                      style={{ color: colors.secondary[500] }}
                    >
                      {supporter.total} RON
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
