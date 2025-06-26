import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Failure() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-bg px-4 text-center">
      <XCircle className="w-20 h-20 text-red-500 mb-6" />
      <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Failed</h1>
      <p className="text-lg text-red-600 mb-6">
        Something went wrong. Please try again later.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        Back to Platform
      </Link>
    </div>
  );
}
