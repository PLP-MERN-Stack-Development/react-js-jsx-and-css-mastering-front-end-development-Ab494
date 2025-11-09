import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import UserCard from '../components/features/UserCard';
import { fetchUsers, searchUsers } from '../api/usersApi';
import { useDebounce } from '../hooks/useDebounce';
import { paginate } from '../utils/helpers';

const UsersDirectory = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 9;

  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const { data, error } = await fetchUsers();
    
    if (data) {
      setUsers(data);
      setError(null);
    } else {
      setError(error?.message || 'Failed to load users');
    }
    setLoading(false);
  };

  const filteredUsers = searchUsers(users, debouncedSearch);
  const paginatedUsers = paginate(filteredUsers, currentPage, usersPerPage);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  if (loading) {
    return (
      <div className="animate-fade-in">
        <Card>
          <LoadingSpinner size="lg" text="Loading users directory..." />
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="animate-fade-in">
        <Card>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">
              Error Loading Users
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <Button variant="primary" onClick={loadUsers} icon="🔄">
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold gradient-text mb-4">
          Users Directory
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Browse and connect with our community members
        </p>
      </div>

      {/* Search and Stats */}
      <Card gradient>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <Input
                placeholder="Search by name, email, username, or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                icon="🔍"
              />
            </div>
            {searchTerm && (
              <Button
                variant="secondary"
                onClick={() => setSearchTerm('')}
                icon="✖️"
              >
                Clear Search
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <p className="text-gray-600 dark:text-gray-400">
              Showing <span className="font-bold text-blue-600 dark:text-blue-400">{paginatedUsers.length}</span> of{' '}
              <span className="font-bold text-purple-600 dark:text-purple-400">{filteredUsers.length}</span> users
              {searchTerm && <span> matching "{searchTerm}"</span>}
            </p>
            {totalPages > 1 && (
              <p className="text-gray-600 dark:text-gray-400">
                Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Users Grid */}
      {paginatedUsers.length === 0 ? (
        <Card>
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Users Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              No users match your search "{searchTerm}"
            </p>
            <Button
              variant="primary"
              onClick={() => setSearchTerm('')}
              icon="✖️"
            >
              Clear Search
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedUsers.map((user, index) => (
            <div
              key={user.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <UserCard user={user} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Card>
          <div className="flex flex-wrap justify-center items-center gap-2">
            <Button
              variant="secondary"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              icon="⬅️"
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, i) => {
                const page = i + 1;
                // Show first page, last page, current page, and pages around current
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`
                        w-10 h-10 rounded-xl font-semibold transition-all duration-300
                        ${currentPage === page
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }
                      `}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 2 ||
                  page === currentPage + 2
                ) {
                  return (
                    <span key={page} className="w-10 h-10 flex items-center justify-center text-gray-500">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <Button
              variant="secondary"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              icon="➡️"
            >
              Next
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default UsersDirectory;