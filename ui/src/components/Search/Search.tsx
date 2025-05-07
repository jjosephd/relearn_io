import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CollegeData } from '../../types/types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { handleError } from '../../utils/errorHandler';
import Spinner from '../Spinner';

axios.defaults.baseURL = 'http://127.0.0.1:5000/schools';

const Search = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [results, setResults] = useState<CollegeData[] | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [program, setProgram] = useState<string>('');
  const [programOptions, setProgramOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get('/programs');
        setProgramOptions(res.data);
      } catch (err) {
        console.error('Failed to load program titles', err);
      }
    };
    fetchPrograms();
  }, []);

  const fetchCollegeData = async (
    schoolName?: string,
    programName?: string
  ) => {
    if (!schoolName && !programName) return;

    setLoading(true);
    try {
      const response = await axios.get('/explore', {
        params: {
          ...(schoolName ? { school_name: schoolName } : {}),
          ...(programName ? { program: programName } : {}),
        },
      });

      setResults(response.data);
      setError('');
    } catch (err: any) {
      const status = err?.response?.status || 500;
      handleError(status);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const schoolName = searchParams.get('school_name') || '';
    const programName = searchParams.get('program') || '';
    fetchCollegeData(schoolName, programName);
  }, [searchParams]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() && !program.trim()) {
      toast('Search field cannot be empty', {
        type: 'error',
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'system',
      });
      return;
    }

    const params = new URLSearchParams();
    if (name.trim()) params.append('school_name', name.trim());
    if (program.trim()) params.append('program', program.trim());

    navigate(`/explore?${params.toString()}`);
    setName('');
    setProgram('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Explore</h2>
      <form onSubmit={onSubmit}>
        <div className="form-container grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Search by name"
            value={name}
            className="search-bar h-10 input bg-slate-400/10 focus-within:bg-slate-400/20 focus:outline-none focus:ring-0 w-full max-w-xs"
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <select
            value={program}
            onChange={(e) => setProgram(e.currentTarget.value)}
            className="search-bar h-10 input bg-slate-400/10 focus-within:bg-slate-400/20 focus:outline-none focus:ring-0 w-full max-w-xs"
          >
            <option value="">Select a Program</option>
            {programOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button className="btn btn-info submit">Search</button>
        </div>
      </form>

      {loading && <Spinner />}

      {results && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {results.map((result) => (
            <div key={result.school_name}>
              <ul>
                <li>
                  <p>University: {result.school_name}</p>
                </li>
                <li>
                  <p>In-State Tuition: {result.in_state_tuition}</p>
                </li>
                <li>
                  <p>Out-Of-State Tuition: {result.out_of_state_tuition}</p>
                </li>
                <li>
                  <p>Admission Rate: {result.admission_rate}</p>
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
