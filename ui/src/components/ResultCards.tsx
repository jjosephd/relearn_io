import React from 'react';

interface School {
  school_name: string;
  state: string;
  city?: string;
  admission_rate?: number;
  in_state_tuition?: number;
  out_of_state_tuition?: number;
  matched_program?: string;
}

interface Props {
  schools: School[];
}

const ResultCards: React.FC<Props> = ({ schools }) => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6 w-full">
      {schools.map((school, idx) => (
        <div
          key={idx}
          className="card bg-base-100 shadow-md border border-base-200 p-4"
        >
          <h2 className="card-title text-lg font-semibold">
            {school.school_name}
          </h2>
          <p className="text-sm text-slate-500">{school.city}, {school.state}</p>
          {school.matched_program && (
            <p className="mt-2 text-xs italic text-slate-400">
              Match: {school.matched_program}
            </p>
          )}
          <div className="mt-4 space-y-1 text-sm">
            <p>🎓 Admission Rate: {school.admission_rate ?? 'N/A'}</p>
            <p>💰 In-State Tuition: ${school.in_state_tuition ?? 'N/A'}</p>
            <p>🌎 Out-of-State Tuition: ${school.out_of_state_tuition ?? 'N/A'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultCards;
