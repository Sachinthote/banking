import BankCard from '@/components/BankCard';
import HeaderBox from '@/components/HeaderBox';
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React, { useEffect, useState } from 'react';

const MyBanks: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Account[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getLoggedInUser();
        if (!user) {
          throw new Error('User not logged in');
        }
        setLoggedIn(user);

        const accountsData = await getAccounts({ userId: user.$id });
        if (!accountsData) {
          throw new Error('No accounts found');
        }
        setAccounts(accountsData.data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className='flex'>
      <div className="my-banks">
        <HeaderBox 
          title="My Bank Accounts"
          subtext="Effortlessly manage your banking activities."
        />

        <div className="space-y-4">
          <h2 className="header-2">
            Your cards
          </h2>
          <div className="flex flex-wrap gap-6">
            {accounts && accounts.map((account) => (
              <BankCard 
                key={account.id}
                account={account}
                userName={loggedIn?.firstName || 'User'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanks;
