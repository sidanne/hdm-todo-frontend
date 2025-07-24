const useFetch = () => {
  const apiBase = 'http://localhost:3000'; // backend local

  return {
    get: async (url: string) => {
      const res = await fetch(`${apiBase}${url}`);
      return res.json();
    },
    post: async (url: string, body: any) => {
      const res = await fetch(`${apiBase}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return res.json();
    },
    patch: async (url: string, body: any) => {
      const res = await fetch(`${apiBase}${url}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return res.json();
    },
    delete: async (url: string) => {
      const res = await fetch(`${apiBase}${url}`, {
        method: 'DELETE',
      });
      return res.json();
    },
  };
};

export default useFetch;
