import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CollegeData } from '../../types/types';
import axios from 'axios';
import { toast } from 'react-toastify';
import { handleError } from '../../utils/errorHandler';
import Spinner from '../Spinner';

axios.defaults.baseURL = 'http://127.0.0.1:5000/schools';
const Search = () => {
  const { schoolName } = useParams();
  const navigate = useNavigate();

  const [results, setResults] = useState<CollegeData[] | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchCollegeData = async (schoolName: string) => {
    setLoading(true);
    try {
      const response = await axios.get('/explore', {
        params: { school_name: schoolName },
      });

      // Set the returned tuition information in the state
      setResults(response.data);
      setError(''); // Clear any previous error message
      setLoading(false);
    } catch (err: any) {
      const status = err?.response?.status || 500;
      handleError(status);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (schoolName) {
      fetchCollegeData(schoolName);
    }
  }, [schoolName]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/explore/${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    } else {
      toast('Search field cannot be empty', {
        type: 'error',
        position: 'bottom-right',
        autoClose: 3000,
        theme: 'system',
      });
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchTerm(event.currentTarget.value);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold ">Explore</h2>
      <form onSubmit={onSubmit}>
        <div className="form-container grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            className="search-bar h-10 input bg-slate-400/10 focus-within:bg-slate-400/20 focus:outline-none focus:ring-0  w-full max-w-xs"
            onChange={onChange}
          />
          <input
            type="text"
            placeholder="Search by program"
            value={searchTerm}
            className="search-bar h-10 input bg-slate-400/10 focus-within:bg-slate-400/20 focus:outline-none focus:ring-0  w-full max-w-xs"
            onChange={onChange}
          />
          <button className="btn btn-info submit">Search</button>
        </div>
      </form>
      {loading && <Spinner />}
      {results && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                  <p>
                    Out-Of-State Tuition:
                    {result.out_of_state_tuition}
                  </p>
                </li>
                <li>
                  <p>
                    Admission Rate:
                    {result.admission_rate}
                  </p>
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
