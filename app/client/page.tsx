"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // useRouter をインポート

const customers = [
    {
      顧客名: '佐藤 太郎',
      メールアドレス: 'taro.sato@example.com',
      電話番号: '090-1234-5678',
      登録日: '2022-01-15',
    },
    {
      顧客名: '鈴木 花子',
      メールアドレス: 'hanako.suzuki@example.com',
      電話番号: '080-2345-6789',
      登録日: '2021-07-20',
    },
    {
      顧客名: '高橋 健太',
      メールアドレス: 'kenta.takahashi@example.com',
      電話番号: '070-3456-7890',
      登録日: '2023-05-10',
    },
    {
      顧客名: '山田 美咲',
      メールアドレス: 'misaki.yamada@example.com',
      電話番号: '090-4567-8901',
      登録日: '2020-12-01',
    },
    {
      顧客名: '木村 俊介',
      メールアドレス: 'shunsuke.kimura@example.com',
      電話番号: '080-5678-9012',
      登録日: '2022-11-18',
    },
  ];


const CustomerList = () => {
  const router = useRouter(); // useRouter を使ってルーターを取得
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' = 昇順, 'desc' = 降順

  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const filtered = customers.filter(customer =>
      customer.顧客名.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  // 登録日で並べ替える関数
  const handleSort = () => {
    const sortedCustomers = [...filteredCustomers].sort((a, b) => {
      const dateA = new Date(a.登録日);
      const dateB = new Date(b.登録日);
      return sortOrder === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    });
    setFilteredCustomers(sortedCustomers);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // 並べ替えの順番を切り替える
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">顧客一覧</h1>

      {/* 検索ボックス */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="顧客名で検索"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 登録日で並べ替えるボタン */}
      <div className="mb-6 text-right">
        <button
          onClick={handleSort}
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          {sortOrder === 'asc' ? '登録日昇順' : '登録日降順'}
        </button>
      </div>

      {/* ログアウトボタン */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => router.push('/')}
          className="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 focus:outline-none"
        >
          ログアウト
        </button>
      </div>

      {/* 顧客情報テーブル */}
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border-b">顧客名</th>
            <th className="py-2 px-4 border-b">メールアドレス</th>
            <th className="py-2 px-4 border-b">電話番号</th>
            <th className="py-2 px-4 border-b">登録日</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map((customer, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{customer.顧客名}</td>
              <td className="py-2 px-4 border-b">{customer.メールアドレス}</td>
              <td className="py-2 px-4 border-b">{customer.電話番号}</td>
              <td className="py-2 px-4 border-b">{customer.登録日}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
