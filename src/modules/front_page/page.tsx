// import { colors } from "../../shared/utils/colors";

import { useAppAuthStore } from "@/modules/auth/appAuthStore";
import GhostButton2 from "@/shared/components/GhostButton2";
import { useState } from "react";
import Layout from "../layout/Layout";
import { descriptionSections } from "./info";

const FrontPage = () => {
  const isAuthenticated = useAppAuthStore((state) => state.isAuthenticated);
  return (
    <>
      <Layout>
        <FirstSection />
        {/* <SecondSection /> */}
        <HowItWorks />
      </Layout>
    </>
  );
};

export const FirstSection = () => {
  return (
    <div className="relative">
      <img
        src="POZA-PRINCIPALA2.png"
        className="w-full h-screen  object-cover object-center "
        alt="main-image"
      />
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-start   w-2/5 p-8 rounded-xl space-y-0 px-16">
        <p className="text-white text-5xl font-bold  text-start">
          Make Your Stream Unforgettable
        </p>
        <br />
        <p className="text-white font-bold  text-text-secondary text-start">
          Turn your audience into active participants and boost your income with
          personalized, animated effects
        </p>
      </div>
    </div>
  );
};

// components/HowItWorks.tsx
function HowItWorks() {
  const [stateNumber, setStateNumber] = useState(0);
  const login = useAppAuthStore((state) => state.login);

  return (
    <section className="bg-bg text-text-primary px-6 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-2">How It Works</h2>
        <p className="text-text-secondary mb-8">
          Take a look at service's basic features.
        </p>

        {/* Butoane */}
        <div className="flex flex-wrap justify-center gap-12  mb-12">
          {descriptionSections.map((sections, index) => {
            return (
              <GhostButton2
                key={index}
                text={sections.title}
                onClick={() => {
                  setStateNumber(index);
                }}
              />
            );
          })}
        </div>

        {/* Conținut */}
        <div className="flex  md:flex-row items-center justify-center gap-12">
          {/* Card */}
          <div className="bg-container p-6 rounded-lg shadow-md w-64 text-center h-[200px]"></div>

          {descriptionSections.map((section, index) => {
            if (index === stateNumber) {
              return (
                <div className="max-w-md text-left">
                  <h3 className="text-2xl font-semibold mb-2">
                    {section.title2}
                  </h3>
                  <p className="text-color-text-secondary mb-4">
                    {section.content}
                  </p>
                  <button
                    className="btn rounded-full px-8 bg-color-button-donate hover:bg-color-button-donate-hover text-color-button-text focus:outline focus:ring-2 focus:ring-color-progress-bar"
                    onClick={() => login()}
                  >
                    Try Now
                  </button>
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}

export default FrontPage;
