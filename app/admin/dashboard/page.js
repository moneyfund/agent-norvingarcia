'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminGuard from '@/components/admin/AdminGuard';
import PropertyForm from '@/components/admin/PropertyForm';
import ProfileForm from '@/components/admin/ProfileForm';
import { authService } from '@/lib/auth';
import { db } from '@/lib/localDb';
import { formatCurrency } from '@/lib/format';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    setProperties(db.getProperties());
    setProfile(db.getProfile());
  }, []);

  const saveProperty = (payload) => {
    const exists = properties.some((item) => item.id === payload.id);

    const nextProperties = exists
      ? properties.map((item) => (item.id === payload.id ? payload : item))
      : [payload, ...properties];

    setProperties(nextProperties);
    db.saveProperties(nextProperties);
    setEditing(null);
  };

  const deleteProperty = (id) => {
    const nextProperties = properties.filter((item) => item.id !== id);
    setProperties(nextProperties);
    db.saveProperties(nextProperties);
  };

  const saveProfile = (nextProfile) => {
    setProfile(nextProfile);
    db.saveProfile(nextProfile);
  };

  const logout = () => {
    authService.logout();
    router.push('/admin/login');
  };

  return (
    <AdminGuard>
      <section className="section-shell space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold">Dashboard Admin</h1>
          <button onClick={logout} className="rounded-full border border-white/20 px-4 py-2 text-sm">
            Cerrar sesión
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <PropertyForm onSave={saveProperty} current={editing} onCancel={() => setEditing(null)} />
          {profile && <ProfileForm profile={profile} onSave={saveProfile} />}
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Propiedades registradas</h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5 text-left">
                <tr>
                  <th className="p-3">Título</th>
                  <th className="p-3">Tipo</th>
                  <th className="p-3">Precio</th>
                  <th className="p-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id} className="border-t border-white/10">
                    <td className="p-3">{property.titulo}</td>
                    <td className="p-3 capitalize">{property.tipo}</td>
                    <td className="p-3 text-luxury-gold">{formatCurrency(property.precio)}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button onClick={() => setEditing(property)} className="rounded border border-white/20 px-3 py-1">
                          Editar
                        </button>
                        <button
                          onClick={() => deleteProperty(property.id)}
                          className="rounded border border-red-400/40 px-3 py-1 text-red-300"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </AdminGuard>
  );
}
