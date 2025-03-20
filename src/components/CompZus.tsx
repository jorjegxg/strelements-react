import { useEffect } from 'react';
import useStore from '../stores/useStore';

const ReactZus = () => {
  const { data, loading, error, fetchData } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Data from API</h1>
      <ul>
        {data?.message}
      </ul>
    </div>
  );
};

export default ReactZus;
