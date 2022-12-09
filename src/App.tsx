import { useEffect, useState } from 'react';
import './App.css';
import { SearchForm } from './search-form';

interface RepoItem {
  full_name: string;
  created_at: string;
  html_url: string;
}

interface SearchResults {
  total_count: number;
  items: RepoItem[];
}

const App = () => {
  const [repos, setRepos] = useState<SearchResults>();
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [error, setError] = useState<string | null>(null);

  const reposSortedByDate = repos?.items
    ? repos.items.sort((a, b) => {
        return new Date(a.created_at) > new Date(b.created_at) ? -1 : 1;
      })
    : [];

  const fetchRepos = async (language: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`
      );
      const data = await response.json();
      if (response.ok) {
        setRepos(data);
      } else {
        setError(data.errors[0].message);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError((err as Error).message);
    }
  };

  if (error) {
    return (
      <div>
        <SearchForm
          onSubmitHandler={() => fetchRepos(language)}
          searchTerm={language}
          onChangeSearchTerm={setLanguage}
        />
        <p>Error fetching data - {error}</p>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  if (!reposSortedByDate) {
    return (
      <div>
        <SearchForm
          onSubmitHandler={() => fetchRepos(language)}
          searchTerm={language}
          onChangeSearchTerm={setLanguage}
        />
      </div>
    );
  }

  if (reposSortedByDate.length === 0) {
    return (
      <div>
        <p>No repos found.</p>
        <SearchForm
          onSubmitHandler={() => fetchRepos(language)}
          searchTerm={language}
          onChangeSearchTerm={setLanguage}
        />
      </div>
    );
  }

  return (
    <div>
      <SearchForm
        onSubmitHandler={() => fetchRepos(language)}
        searchTerm={language}
        onChangeSearchTerm={setLanguage}
      />

      <ul>
        {reposSortedByDate.map((repo) => (
          <li key={repo.full_name}>
            <a href={repo.html_url} target="_blank">
              {repo.full_name}{' '}
              <span>({new Date(repo.created_at).toLocaleDateString()})</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
