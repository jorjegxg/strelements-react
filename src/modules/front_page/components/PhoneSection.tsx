import { phoneSection } from "../info";
import { FeatureCard } from "./FeatureCard";

export function PhoneSection() {
  return (
    <section className="bg-bg text-text-primary px-6 py-12  bg-second-bg">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-2">{phoneSection.title}</h2>
        <p className="text-text-secondary mb-8">{phoneSection.subtitle}</p>
        <FeatureCard
          section={{
            title: phoneSection.title,
            title2: phoneSection.title2,
            content: phoneSection.content,
            pathToAnimation: phoneSection.pathToAnimation,
          }}
          reversed={true}
        />
        {/* Butoane */}
      </div>
    </section>
  );
}
