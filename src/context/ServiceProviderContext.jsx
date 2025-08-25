import React, { createContext, useContext, useState } from "react";

const ServiceProviderContext = createContext();

export function ServiceProviderProvider({ children }) {
  const [pendingProviders, setPendingProviders] = useState([]);
  const [approvedProviders, setApprovedProviders] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const registerProvider = (provider) => {
    const newProvider = { ...provider, id: Date.now() };
    setPendingProviders(prev => [...prev, newProvider]);
    setNotifications(prev => [...prev, { id: Date.now(), message: `New provider registered: ${provider.cid}` }]);
  };

  const approveProvider = (id) => {
    const provider = pendingProviders.find(p => p.id === id);
    if (!provider) return;
    setApprovedProviders(prev => [...prev, provider]);
    setPendingProviders(prev => prev.filter(p => p.id !== id));
    setNotifications(prev => [...prev, { id: Date.now(), message: `Provider approved: ${provider.cid}` }]);
  };

  const rejectProvider = (id) => {
    setPendingProviders(prev => prev.filter(p => p.id !== id));
    setNotifications(prev => [...prev, { id: Date.now(), message: `Provider rejected: ${id}` }]);
  };

  return (
    <ServiceProviderContext.Provider value={{
      pendingProviders,
      approvedProviders,
      notifications,
      registerProvider,
      approveProvider,
      rejectProvider
    }}>
      {children}
    </ServiceProviderContext.Provider>
  );
}

export const useServiceProvider = () => useContext(ServiceProviderContext);
