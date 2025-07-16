import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section className="w-full max-w-[1400px] bg-white rounded-3xl shadow-lg p-8 md:p-16 lg:p-24 mx-auto mt-8 text-center">
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">Your Next Step Begins Here!</h2>
      <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
        This platform was created to help Uncommon alumni keep growing beyond the bootcamp. It fills in the gaps,
        covering soft skills, advanced digital tools, and new career pathways that weren’t fully explored during the
        one-year program. Whether you're refining your communication, boosting your tech skills, or preparing for
        real-world challenges, this space is here to support your next step.
      </p>
      <Button className="bg-uncommonBlue-DEFAULT hover:bg-uncommonBlue-dark text-white px-8 py-3 rounded-md text-lg">
        Get Started &gt;&gt;
      </Button>
    </section>
  )
}