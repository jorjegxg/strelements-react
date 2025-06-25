import GhostButton2 from "@/shared/components/GhostButton2";
import { useState } from "react";
import { descriptionSections } from "../info";
import { FeatureCard } from "./FeatureCard";

export function HowItWorks() {
  const [stateNumber, setStateNumber] = useState(0);

  return (
    <section className="bg-bg text-text-primary px-6 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-2">How It Works</h2>
        <p className="text-text-secondary mb-8">
          Take a look at service's basic features.
        </p>

        {/* Butoane */}
        <div className="flex flex-wrap justify-center gap-12  ">
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
          {descriptionSections.map((section, index) => {
            if (index === stateNumber) {
              return (
                <FeatureCard key={index} section={section} reversed={false} />
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
