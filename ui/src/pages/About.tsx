const About = () => {
  type StaggeredRowProps = {
    left: React.ReactNode;
    right: React.ReactNode;
    reverse?: boolean;
  };

  const StaggeredRow: React.FC<StaggeredRowProps> = ({
    left,
    right,
    reverse = false,
  }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
        <div className={reverse ? 'mt-10 md:mt-10' : 'mt-0 md:mt-0'}>
          {left}
        </div>
        <div
          className={`text-right md:text-right flex flex-col items-end ${
            reverse ? 'mt-0 md:mt-0' : 'mt-10 md:mt-10'
          }`}
        >
          {right}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full p-6 md:p-16 space-y-16">
      {/* Header */}
      <div className="header-container flex justify-center items-center">
        <header className="text-3xl font-bold text-center">Pathwise</header>
      </div>

      {/* Section 1 */}
      <StaggeredRow
        left={
          <>
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <ul className="space-y-4">
              <li>
                <p>
                  At Pathwise, we help working adults and parents return to
                  school—or pivot to career-ready certifications—without the
                  confusion, cost traps, or wasted time. We believe education
                  should work around your life, not take it over.
                </p>
              </li>
              <li>
                <p>
                  We simplify the search, streamline planning, and guide adults
                  toward practical, flexible educational paths that lead to real
                  outcomes.
                </p>
              </li>
            </ul>
          </>
        }
        right={
          <>
            <h2 className="text-xl font-semibold mb-4">Why We Exist</h2>
            <p>
              College enrollment in the U.S. is declining. Rising costs, unclear
              job outcomes, and a changing economy have left millions
              questioning if school is still worth it—especially adults with
              jobs, kids, or debt.
            </p>
          </>
        }
      />
    </div>
  );
};

export default About;
