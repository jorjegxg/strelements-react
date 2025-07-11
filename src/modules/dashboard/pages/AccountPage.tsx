import {
  Gamepad2,
  Mail,
  MapPin,
  Mic,
  Phone,
  Twitch,
  User,
  Youtube,
} from "lucide-react";
import { JSX } from "react";

export default function StreamerAccountPage(): JSX.Element {
  const streamerInfo = {
    name: "Nectarian",
    email: "contact@nectarian.gg",
    phone: "(123) 456-7890",
    location: "San Francisco, CA",
    occupation: "Professional Streamer & Content Creator",
    company: "",
    platforms: {
      twitch: "twitch.tv/pixelwarrior",
      youtube: "youtube.com/pixelwarrior",
      twitter: "@pixelwarrior",
    },
    games: ["FPS", "Battle Royale", "RPG"],
    schedule: "Mon-Wed-Fri @ 7PM PST",
    followers: "125K",
    subs: "8.2K",
  };

  return (
    <div className="w-full min-h-screen  p-6 text-gray-100">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8 border border-purple-500">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center ">
            <User className="w-8 h-8 text-gray-100" />
          </div>
          <div className=" w-full">
            <h1 className=" text-2xl font-bold text-purple-400 text-center">
              {streamerInfo.name}
            </h1>
            <p className="text-purple-300">{streamerInfo.occupation}</p>
            <p className="text-sm text-gray-400">{streamerInfo.company}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700 p-3 rounded-lg">
            <p className="text-sm text-gray-400">Followers</p>
            <p className="text-xl font-bold text-purple-400">
              {streamerInfo.followers}
            </p>
          </div>
          <div className="bg-gray-700 p-3 rounded-lg">
            <p className="text-sm text-gray-400">Subscribers</p>
            <p className="text-xl font-bold text-purple-400">
              {streamerInfo.subs}
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-purple-400" />
            <span className="text-gray-200">{streamerInfo.email}</span>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-purple-400" />
            <span className="text-gray-200">{streamerInfo.phone}</span>
          </div>

          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-purple-400" />
            <span className="text-gray-200">{streamerInfo.location}</span>
          </div>

          <div className="flex items-center space-x-3">
            <Gamepad2 className="w-5 h-5 text-purple-400" />
            <span className="text-gray-200">
              Main Games: {streamerInfo.games.join(", ")}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Mic className="w-5 h-5 text-purple-400" />
            <span className="text-gray-200">
              Stream Schedule: {streamerInfo.schedule}
            </span>
          </div>
        </div>

        {/* Social Platforms */}
        <div className="space-y-3">
          <h3 className="font-bold text-purple-400 flex items-center">
            <Twitch className="w-5 h-5 mr-2" /> Platforms
          </h3>
          <div className="flex space-x-4">
            <a
              href={`https://${streamerInfo.platforms.twitch}`}
              className="flex items-center text-gray-200 hover:text-purple-300"
            >
              <Twitch className="w-5 h-5 mr-2" /> Twitch
            </a>
            <a
              href={`https://${streamerInfo.platforms.youtube}`}
              className="flex items-center text-gray-200 hover:text-purple-300"
            >
              <Youtube className="w-5 h-5 mr-2" /> YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
