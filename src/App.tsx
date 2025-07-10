import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  GitBranch,
  Compass,
  Camera,
  Gift,
  ArrowRightLeft,
  Zap,
} from "lucide-react";
import Modal from "./components/Modal";
import UserProfileCard from "./components/UserProfileCard";
import PromptCompanionCard from "./components/PromptCompanionCard";
import PromptTemplatesCard from "./components/PromptTemplatesCard";

type ModalType = "user" | "companion" | "templates" | null;

const users = [
  {
    name: "Monye Matt",
    usage: "20k Use",
    avatarUrl:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  {
    name: "Alex Johnson",
    usage: "15k Use",
    avatarUrl:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
  {
    name: "Sarah Chen",
    usage: "12k Use",
    avatarUrl:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
  },
];

function App() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const handleUserNavigation = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentUserIndex((prev) => (prev - 1 + users.length) % users.length);
    } else {
      setCurrentUserIndex((prev) => (prev + 1) % users.length);
    }
  };

  return (
    <div className="min-h-dvh bg-[#03061c] relative overflow-auto pb-10">
      {/* Main container */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-4 gap-6 p-6">
        {/* Top section with left cards and main purple card */}
        {/* Left column */}
        <div className="col-span-1 flex flex-col gap-6">
          {/* Create template card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="radial-bg rounded-3xl p-8 h-full flex flex-col justify-between light-border"
          >
            <h3 className="light-gradient-text text-4xl font-medium leading-tight">
              Create
              <br />
              your own
              <br />
              template
            </h3>
            <div className="">
              <p className="text-white text-xl font-medium mb-1">
                14 days trial
              </p>
              <p className="text-[#ACA0E4] text-sm">after - $5/month</p>
            </div>
          </motion.div>

          {/* Top Users card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="radial-bg rounded-3xl p-8 h-64 text-center light-border"
          >
            <div className="orange-gradient-text text-7xl font-medium">20</div>
            <div className="text-textBrandPurple text-xl mb-8">Top Users</div>
            <div className="flex -space-x-4 justify-center">
              {users.slice(0, 3).map((user, index) => (
                <img
                  key={index}
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-4 border-[#1e1e3f] cursor-pointer hover:scale-110 transition-transform"
                  onClick={() => {
                    setCurrentUserIndex(index);
                    setActiveModal("user");
                  }}
                />
              ))}
            </div>
          </motion.div>

          <div className="light-border rounded-3xl p-6 min-h-40 flex items-center justify-center radial-bg">
            <div className="p-2 bg-[#110A2B40] rounded-full my-shadow">
              <motion.div whileHover={{ scale: 0.96 }} className="">
                <button className="w-full purple-gradient  text-white py-4 px-8 rounded-full font-semibold hover:from-purple-700 hover:to-purple-800 transition-all flex items-center justify-center gap-3 text-lg">
                  <Sparkles className="w-6 h-6" />
                  Generate
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main purple Template AI card */}
        <div className="flex flex-col gap-6 relative col-span-2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative "
          >
            <motion.svg
              className="absolute w-full h-full z-50 -bottom-[55%]"
              viewBox="0 0 100 100" // Defines the coordinate system for the SVG
              initial={{ rotate: 0 }} // Initial rotation state
              animate={{ rotate: 360 }} // Animate to a full 360-degree rotation
              transition={{
                ease: "linear", // Linear animation for continuous spin
                duration: 20, // Duration of one full rotation in seconds
                repeat: Infinity, // Repeat the animation indefinitely
              }}
            >
              {/* Path element defines the circular path for the text */}
              {/* M 50, 50: Move to the center of the viewBox (50,50) */}
              {/* m -40, 0: Move relative to the current position to the start of the arc (radius 40) */}
              {/* a 40,40 0 1,1 80,0: Draws the first half of the circle (arc with radius 40, 80 units wide) */}
              {/* a 40,40 0 1,1 -80,0: Draws the second half of the circle, completing it */}
              <path
                id="circlePath"
                fill="none"
                d="M 50, 50 m -42.5, 0 a 42.5,42.5 0 1,1 85,0 a 42.5,42.5 0 1,1 -85,0"
              />

              {/* Text element to place the text along the defined path */}
              <text className="text-[3px]">
                {/* textPath links the text to the circlePath */}
                <textPath
                  href="#circlePath"
                  pathLength={2 * Math.PI * 42.5}
                  className="stroke-purple-300 stroke-[0.2px]"
                >
                  {/* startOffset="50%" centers the text along the path */}
                  100011 100011 100011 100011 100011 100011 100011 100011
                  100011100011100011 100011 100011 100011 100011
                  100011100011100011 100011 100011 100011100011100011 1111100011
                  100011
                </textPath>
              </text>
            </motion.svg>
            <img src="bg.svg" className="w-full" alt="bg" />
            <div className="absolute top-0 w-full h-full text-6xl font-semibold text-gray-200 flex justify-center pt-8">
              Template AI
            </div>
            <div className="bg-[#4c1acd] my-shadow rounded-t-full border border-[rgba(255,255,255,0.26)] opacity-30 shrink-0 w-[368px] h-[178px] absolute left-1/2 -translate-x-1/2 top-[234px] z-10 "></div>
            <div className="absolute flex justify-center items-center -bottom-5 -left-11 z-40 translate-y-1/2 translate-x-1/2 w-[326px] h-[326px] rounded-full bg-[#03061c]">
              <img src="sphere.png" alt="sphere" />
            </div>
          </motion.div>

          <div className="flex-1 grid grid-cols-2 gap-6 h-48 relative overflow-hidden">
            <div className="bg-[#191934] my-shadow rounded-bl-full top-0 border border-[rgba(255,255,255,0.26)] opacity-30 shrink-0 w-[178px] h-[186px] absolute left-[33%] -translate-x-1/2 z-10 "></div>
            <div className="bg-[#191934] my-shadow rounded-br-full top-0 border border-[rgba(255,255,255,0.26)] opacity-30 shrink-0 w-[178px] h-[186px] absolute right-[33%] translate-x-1/2 z-10 "></div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative cursor-pointer"
              onClick={() => setActiveModal("companion")}
            >
              <img src="bottomLeft.svg" className="w-full" alt="bottom-left" />
              <img
                src="leftUnion.svg"
                className=" absolute top-2 left-2"
                alt="bottom-right"
              />
              <div className="flex flex-col justify-end items-start gap-6 h-full pt-4 absolute top-0 p-8">
                <motion.div className="p-2 bg-[#110a2bbe] rounded-full my-shadow">
                  <div className="w-14 h-14 orange-radial border border-[#5b4b8973] rounded-full flex items-center justify-center flex-shrink-0 before:content-[' '] before:block before:h-2 before:w-10 before:bg-[#110a2bbe] before:absolute before:left-0">
                    <GitBranch className="size-7 text-white" />
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-white text-xl font-semibold mb-3">
                    Branching paths
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    Explore multiple prompt directions with branching.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* AI journey card - with circular cutout top-left */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative cursor-pointer"
              onClick={() => setActiveModal("templates")}
            >
              <img
                src="bottomRight.svg"
                className="w-full"
                alt="bottom-right"
              />
              <img
                src="rightUnion.svg"
                className=" absolute top-2 right-2"
                alt="union"
              />

              <div className="flex flex-col justify-end items-start gap-6 h-full pt-4 absolute top-0 p-8">
                <motion.div className="p-2 bg-[#110a2bbe] rounded-full ">
                  <div className="w-14 h-14 purple-gradient rounded-full flex items-center justify-center flex-shrink-0 before:content-[' '] before:block before:h-2 before:w-10 before:bg-[#110a2bbe] before:absolute before:left-0">
                    <Compass className="w-7 h-7 text-white" />
                  </div>
                </motion.div>
                <div className="">
                  <h3 className="text-white text-xl font-semibold mb-3">
                    Ai journey
                  </h3>
                  <p className="text-gray-400 text-base leading-relaxed">
                    Boost your prompt precision with keywords.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6 col-span-1">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="radial-bg light-border rounded-3xl p-8 min-h-44 flex items-center justify-center"
          >
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="group peer toggler my-shadow ring-0 bg-black/15 p-2 rounded-full outline-none duration-300 after:duration-300 w-36 h-20  shadow-md peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:outline-none after:h-16 after:w-16 after:left-2 after:flex after:justify-center after:items-center peer-checked:after:translate-x-16 peer-checked:after:content-['✔️'] peer-hover:after:scale-95"></div>
            </label>
          </motion.div>

          {/* 25M created prompts */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="radial-bg light-border rounded-3xl p-8 min-h-60 flex flex-col justify-center items-center text-center gap-5"
          >
            <div className="gradient-text text-6xl font-medium">25M</div>
            <div className="relative flex-shrink-0 w-[196px] h-10 box-border">
              <div className="absolute top-0 left-[5px] w-[188px] h-10 bg-gradient-to-r from-[rgba(178,148,255,0.1)] to-[rgba(79,43,172,0.2)]"></div>
              <img
                src="union.svg"
                className="absolute top-0 left-0 w-[10px] h-10"
                alt="union"
              />
              <img
                src="union.svg"
                className="absolute top-0 left-[188px] w-[10px] h-10"
                alt="union"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-textBrandPurple text-lg font-normal flex items-center justify-center">
                created prompts
              </div>
            </div>
          </motion.div>

          {/* Prompt Service */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="radial-bg light-border rounded-3xl p-8 h-full flex flex-col justify-between"
          >
            <div>
              <h3 className="text-[#E6E3FF] text-lg font-semibold mb-1">
                Prompt Service
              </h3>
              <p className="text-[#ACA0E4]">
                Use pre-made templates to jumpstart creativity.
              </p>
            </div>
            <div className="grid grid-cols-3">
              <div className="flex flex-col gap-2">
                <div className="origin-left translate-x-2 translate-y-4 -rotate-[50deg] text-purple-200 py-3 px-7 bg-[#636AB636] border border-white/5 rounded-full w-fit flex items-center">
                  <span className="inline-block w-3 h-3 bg-purple-600 rounded-full mr-2 mt-px" />
                  {""}
                  Rewrite
                </div>
                <div className="purple-gradient p-4 rounded-full w-fit">
                  <Camera className="size-8 stroke-white transform -rotate-[30deg]" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="translate-x-7 -translate-y-4 orange-radial p-4 rounded-full w-fit">
                  <Gift className="size-8 stroke-white rotate-45" />
                </div>
                <div className="origin-right translate-y-3.5 -translate-x-4 rotate-[30deg] text-purple-200 py-3 px-5 bg-[#636AB636] border border-white/5 rounded-full w-fit flex items-center gap-4">
                  <ArrowRightLeft className="stroke-purple-300 size-5" />
                  <div className="orange-radial rounded-full p-1">
                    <Zap className="size-4 stroke-none fill-white" />
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute left-0 -translate-x-1/4 bottom-2/3 -rotate-90 text-purple-200 py-3 px-7 bg-[#636AB636] border border-white/5 rounded-full w-fit flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 purple-gradient rounded-full" />
                    {""}
                    JPG
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 orange-radial rounded-full" />
                    {""}
                    PNG
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5 bg-sky-600 rounded-full" />
                    {""}
                    PDF
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={activeModal === "user"}
        onClose={() => setActiveModal(null)}
        showNavigation={true}
        onPrevious={() => handleUserNavigation("prev")}
        onNext={() => handleUserNavigation("next")}
      >
        <UserProfileCard {...users[currentUserIndex]} />
      </Modal>

      <Modal
        isOpen={activeModal === "companion"}
        onClose={() => setActiveModal(null)}
      >
        <PromptCompanionCard />
      </Modal>

      <Modal
        isOpen={activeModal === "templates"}
        onClose={() => setActiveModal(null)}
      >
        <PromptTemplatesCard />
      </Modal>
    </div>
  );
}

export default App;
