import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabase';

const AuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Función para manejar el hash de la URL
    const handleAuthRedirect = async () => {
      try {
        // Obtener el hash de la URL
        const hash = window.location.hash;
        
        if (hash && hash.includes('access_token')) {
          try {
            // Extraer el token de acceso del hash de manera más segura
            const hashParams = new URLSearchParams(hash.substring(1));
            const accessToken = hashParams.get('access_token');
            const refreshToken = hashParams.get('refresh_token');
            
            if (accessToken) {
              // Establecer la sesión con el token
              const { data, error } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken
              });
              
              if (error) {
                console.error('Error al establecer la sesión:', error);
                navigate('/login');
              } else {
                console.log('Sesión establecida correctamente:', data);
                // Guardar el nombre de usuario en localStorage si está disponible
                if (data.user?.user_metadata?.name) {
                  localStorage.setItem('userName', data.user.user_metadata.name);
                }
                // Redirigir al dashboard
                navigate('/dashboard');
              }
            }
          } catch (error) {
            console.error('Error al procesar el token:', error);
            navigate('/login');
          }
        } else {
          // Si no hay hash con token, verificar si hay sesión activa
          const { data } = await supabase.auth.getSession();
          if (!data.session) {
            navigate('/login');
          } else {
            navigate('/dashboard');
          }
        }
      } catch (error) {
        console.error('Error general en AuthHandler:', error);
        navigate('/login');
      }
    };

    handleAuthRedirect();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-dark">
      <div className="animate-pulse text-light">Procesando autenticación...</div>
    </div>
  );
};

export default AuthHandler;