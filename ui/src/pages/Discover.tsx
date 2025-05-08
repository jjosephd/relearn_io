import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

interface School {
  school_name: string;
  state: string;
  city?: string;
  admission_rate?: number;
  in_state_tuition?: number;
  out_of_state_tuition?: number;
  matched_program?: string;
}

const Discover = () => {
  const [state, setState] = useState('');
  const [program, setProgram] = useState('');
  const [tuition, setTuition] = useState('');
  const [schoolName, setSchoolName] = useState('');

  const [results, setResults] = useState<School[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    const params: any = {};
    if (state) params.state = state;
    if (program) params.program = program;
    if (tuition) params.tuition = tuition;
    if (schoolName) params.school_name = schoolName;

    if (Object.keys(params).length === 0) return;

    setLoading(true);
    setError('');
    setResults(null);

    try {
      const res = await axios.get('http://127.0.0.1:5000/schools/discover', {
        params,
      });

      const { schools, count, from_cache, message } = res.data;
      setResults(schools);

      toast.success(
        `${count} result(s) ${from_cache ? 'from cache' : 'live'} — ${message}`,
        {
          position: 'bottom-right',
          autoClose: 3000,
          theme: 'dark',
        }
      );
    } catch (err) {
      setError('Failed to fetch schools.');
      toast.error('Backend error — try again later.', {
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'dark',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Discover Schools</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">State</span>
          </label>
          <input
            type="text"
            className="input input-ghost w-full bg-base-200/20 placeholder:text-base-content/40 focus:bg-base-200/40 focus:outline-none"
            placeholder="e.g. va"
            value={state}
            onChange={(e) => setState(e.target.value.toLowerCase())}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Program</span>
          </label>
          <input
            type="text"
            className="input input-ghost w-full bg-base-200/20 placeholder:text-base-content/40 focus:bg-base-200/40 focus:outline-none"
            placeholder="e.g. science"
            value={program}
            onChange={(e) => setProgram(e.target.value)}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Maximum Tuition</span>
          </label>
          <input
            type="number"
            className="input input-ghost w-full bg-base-200/20 placeholder:text-base-content/40 focus:bg-base-200/40 focus:outline-none"
            placeholder="e.g. 10000"
            value={tuition}
            onChange={(e) => setTuition(e.target.value)}
          />
        </div>

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">School Name</span>
          </label>
          <input
            type="text"
            className="input input-ghost w-full bg-base-200/20 placeholder:text-base-content/40 focus:bg-base-200/40 focus:outline-none"
            placeholder="e.g. VCU"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {loading && <Spinner />}

      {error && (
        <div className="alert alert-error mt-4 shadow-lg">
          <span>{error}</span>
        </div>
      )}

      {results && results.length > 0 && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6">
          {results.map((school, idx) => (
            <div
              key={`${school.school_name}-${idx}`}
              className="card bg-base-100 shadow-md border border-base-200 p-4"
            >
              <h2 className="card-title text-lg font-semibold">
                {school.school_name}
              </h2>
              <p className="text-sm text-slate-500">
                {school.city}, {school.state}
              </p>

              {school.matched_program && (
                <p className="mt-2 text-xs italic text-slate-400">
                  Match: {school.matched_program}
                </p>
              )}

              <div className="mt-4 space-y-1 text-sm">
                <p>🎓 Admission Rate: {school.admission_rate ?? 'N/A'}</p>
                <p>💰 In-State Tuition: ${school.in_state_tuition ?? 'N/A'}</p>
                <p>
                  🌎 Out-of-State Tuition: $
                  {school.out_of_state_tuition ?? 'N/A'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {results && results.length === 0 && (
        <p className="text-center mt-4 text-slate-400">No results found.</p>
      )}
    </div>
  );
};

export default Discover;
