import { configureStore, createSlice } from '@reduxjs/toolkit';

// Jefes de Dark Souls 
const bossesSlice = createSlice({
  name: 'bosses',
  initialState: {
    bosses: [
      {
        id: '1',
        name: 'Demonio del Refugio',
        location: 'Refugio de los no muertos',
        difficulty: 'Fácil',
        completed: false,
        attempts: 0,
        notes: 'Primer jefe del juego'
      },
      {
        id: '1.1',
        name: 'Demonio salvaje',
        location: 'Al Regresar al Refugio de los no muertos',
        difficulty: 'Medio',
        completed: false,
        attempts: 0,
        notes: 'El Demonio salvaje es similar en apariencia al Demonio del Refugio, pero es mucho más fuerte'
      },
      {
        id: '2',
        name: 'Demonio de Tauro',
        location: 'Burgo de los no muertos',
        difficulty: 'Fácil',
        completed: false,
        attempts: 0,
        notes: 'Se encuentra en el Burgo de los no muertos, al otro extremo del puente después de ascender por la torre con la escalera circular'
      },
      {
        id: '2.1',
        name: 'Demonio de Aries',
        location: 'Burgo de los no muertos Inferior',
        difficulty: 'Fácil',
        completed: false,
        attempts: 0,
        notes: 'Primero se lo encuentra como un jefe opcional en el Burgo de los no muertos inferior, después del área con los perros y los Ladrones Huecos'
      },
      {
        id: '2.2',
        name: 'Gárgolas del Campanario',
        location: 'Parroquia de los No Muertos',
        difficulty: 'Medio',
        completed: false,
        attempts: 0,
        notes: 'Dos gárgolas en el techo SUERTE'
      },
      {
        id: '3',
        name: 'Demonio de Capra',
        location: 'Burgos de los No Muertos Inferior',
        difficulty: 'Medio',
        completed: false,
        attempts: 0,
        notes: 'Jefe en espacio pequeño con perros'
      },
      {
        id: '4',
        name: 'Dragón Devorador',
        location: 'Las Profundidades',
        difficulty: 'Medio',
        completed: false,
        attempts: 0,
        notes: ''
      },
      {
        id: '5',
        name: 'Ornstein y Smough',
        location: 'Anor Londo',
        difficulty: 'Difícil',
        completed: false,
        attempts: 0,
        notes: 'Uno de los jefes más difíciles del juego'
      },
      {
        id: '6',
        name: 'Los Cuatro Reyes',
        location: 'El Abismo',
        difficulty: 'Difícil',
        completed: false,
        attempts: 0,
        notes: 'Jefe en completa oscuridad'
      },
      {
        id: '7',
        name: 'Gwyn, Señor de la Ceniza',
        location: 'Horno de la Llama Original',
        difficulty: 'Muy Difícil',
        completed: false,
        attempts: 0,
        notes: 'Jefe final del juego'
      }
    ]
  },
  reducers: {
    addBoss: (state, action) => {
      const newBoss = {
        ...action.payload,
        id: Date.now().toString()
      };
      state.bosses.push(newBoss);
    },
    updateBoss: (state, action) => {
      const index = state.bosses.findIndex(boss => boss.id === action.payload.id);
      if (index !== -1) {
        state.bosses[index] = action.payload;
      }
    },
    deleteBoss: (state, action) => {
      state.bosses = state.bosses.filter(boss => boss.id !== action.payload);
    },
    toggleBossCompletion: (state, action) => {
      const boss = state.bosses.find(boss => boss.id === action.payload);
      if (boss) {
        boss.completed = !boss.completed;
        if (boss.completed && boss.attempts === 0) {
          boss.attempts = 1;
        }
      }
    },
    incrementAttempts: (state, action) => {
      const boss = state.bosses.find(boss => boss.id === action.payload);
      if (boss) {
        boss.attempts += 1;
      }
    }
  }
});

// Función helper para verificar si todos los logros están completados (excepto Alma Oscura)
const checkAllAchievementsCompleted = (achievements) => {
  const otherAchievements = achievements.filter(ach => ach.id !== '1'); // Excluir Alma Oscura ya que es el id '1'
  return otherAchievements.every(ach => ach.completed);
};

// Logros de Dark Souls (lista completa + Añadidos nuevos logros)
const achievementsSlice = createSlice({
  name: 'achievements',
  initialState: {
    achievements: [
      {
        id: '1',
        title: 'Alma Oscura',
        description: 'Conseguir todos los logros',
        completed: false,
        requirement: 'Completar todos los demás logros del juego'
      },
      {
        id: '2',
        title: 'Enlazar el Fuego',
        description: 'Consigue el final "Enlazar el Fuego"',
        completed: false,
        requirement: 'Descansa en la Hoguera tras matar a Gwyn'
      },
      {
        id: '3',
        title: 'Señor Oscuro',
        description: 'Consigue el final "Señor Oscuro"',
        completed: false,
        requirement: 'No descanses en la Hoguera y sal del gran Horno'
      },
      {
        id: '4',
        title: 'Honor del Caballero',
        description: 'Consigue todas las armas raras',
        completed: false,
        requirement: 'Armas de jefe, Armas de dragón, Armas de pactos, Armas de enemigos y Botín'
      },
      {
        id: '5',
        title: 'Conocimiento de un Sabio',
        description: 'Obtén todos los hechizos',
        completed: false,
        requirement: 'Encuentra todos los Hechizos, incluyendo los del DLC'
      },
      {
        id: '6',
        title: 'Vínculo de un Piromántico',
        description: 'Obtén todas las piromancias',
        completed: false,
        requirement: 'Encontrar todas las piromancias incluyendo las del DLC'
      },
      {
        id: '7',
        title: 'Rezo de una Dama',
        description: 'Obtén todos los milagros',
        completed: false,
        requirement: 'Encontrar todos los milagros, incluidos los del DLC'
      },
      {
        id: '8',
        title: 'Pacto: Camino de la Blancura',
        description: 'Descubre el pacto Camino de la Blancura',
        completed: false,
        requirement: 'Hablar con Petrus en el Santuario de Enlace de Fuego o con Reah después de rescatarla'
      },
      {
        id: '9',
        title: 'Pacto: Guardia de la Princesa',
        description: 'Descubre el pacto Guardia de la Princesa',
        completed: false,
        requirement: 'Hablar con Gwynevere en Anor Londo'
      },
      {
        id: '10',
        title: 'Pacto: Espada de la Luna Oscura',
        description: 'Descubre el pacto Espada de la Luna Oscura',
        completed: false,
        requirement: 'Arrodillarse ante la estatua de Gwyn después del girador de sol en Anor Londo'
      },
      {
        id: '11',
        title: 'Pacto: Guerrero de la Luz Solar',
        description: 'Descubre el pacto Guerrero de la Luz Solar',
        completed: false,
        requirement: 'Rezar ante la estatua del guerrero del sol después del Puente de Draque'
      },
      {
        id: '12',
        title: 'Pacto: Siervos de la Dama de la Oscuridad',
        description: 'Descubre el pacto Siervos de la Dama de la Oscuridad',
        completed: false,
        requirement: 'Hablar con Quelana de Izalith en Pantano de la Plaga'
      },
      {
        id: '13',
        title: 'Pacto: Cazadores de la Selva',
        description: 'Descubre el pacto Cazadores de la Selva',
        completed: false,
        requirement: 'Hablar con Alvina en el Santuario de la Selva'
      },
      {
        id: '14',
        title: 'Pacto: Camino de los Dragones',
        description: 'Descubre el pacto Camino de los Dragones',
        completed: false,
        requirement: 'Interactuar con el huevo de piedra en el Valle de los Dragones'
      },
      {
        id: '15',
        title: 'Pacto: Siervos de la Cama de la Agonía',
        description: 'Descubre el pacto Siervos de la Cama de la Agonía',
        completed: false,
        requirement: 'Ofrecer 30 Humanidades a la Hermana de la Cama de la Agonía'
      },
      {
        id: '16',
        title: 'Forjador de Armas',
        description: 'Refuerza un arma normal hasta el nivel máximo',
        completed: false,
        requirement: 'Mejorar cualquier arma normal a +15'
      },
      {
        id: '17',
        title: 'Forjador de Armas de Fuego',
        description: 'Refuerza un arma de fuego hasta el nivel máximo',
        completed: false,
        requirement: 'Mejorar cualquier arma de fuego a +10'
      },
      {
        id: '18',
        title: 'Forjador de Armas Divinas',
        description: 'Refuerza un arma divina hasta el nivel máximo',
        completed: false,
        requirement: 'Mejorar cualquier arma divina a +10'
      },
      {
        id: '19',
        title: 'Forjador de Armas Ocultas',
        description: 'Refuerza un arma oculta hasta el nivel máximo',
        completed: false,
        requirement: 'Mejorar cualquier arma oculta a +10'
      },
      {
        id: '20',
        title: 'Forjador de Armas de Cristal',
        description: 'Refuerza un arma de cristal hasta el nivel máximo',
        completed: false,
        requirement: 'Mejorar cualquier arma de cristal a +5'
      },
      {
        id: '21',
        title: 'Forjador de Armas de Rayo',
        description: 'Refuerza un arma de rayo hasta el nivel máximo',
        completed: false,
        requirement: 'Mejorar cualquier arma de rayo a +5'
      },
      {
        id: '22',
        title: 'Forjador de Armas de Fuego del Caos',
        description: 'Refuerza un arma de fuego del caos hasta el nivel máximo',
        completed: false,
        requirement: 'Mejorar cualquier arma de fuego del caos a +5'
      },
      {
        id: '23',
        title: 'Rango máximo en un pacto',
        description: 'Alcanza el rango máximo en cualquier pacto',
        completed: false,
        requirement: 'Conseguir el nivel máximo en cualquier pacto del juego'
      },
      {
        id: '24',
        title: 'Bendición de la Dama de la Oscuridad',
        description: 'Aprende piromancia avanzada',
        completed: false,
        requirement: 'Que Quelana te enseñe piromancias avanzadas'
      },
      {
        id: '25',
        title: 'Cazador de Demonios',
        description: 'Derrota a todos los demonios legendarios',
        completed: false,
        requirement: 'Derrotar al Demonio del Refugio, Demonio de Tauro, Demonio de Capra, etc.'
      },
      {
        id: '26',
        title: 'Cazador de Dragones',
        description: 'Derrota a todos los dragones legendarios',
        completed: false,
        requirement: 'Derrotar al Dragón Devorador, Guardián del Abismo, etc.'
      },
      {
        id: '27',
        title: 'Cazador de Señores',
        description: 'Derrota a todos los Señores de la Ceniza',
        completed: false,
        requirement: 'Derrotar a Nito, La Bruja de Izalith, Los Cuatro Reyes y Gwyn'
      },
      {
        id: '28',
        title: 'Explorador de Lordran',
        description: 'Descubre todas las áreas del juego',
        completed: false,
        requirement: 'Visitar todas las zonas principales de Lordran'
      },
      {
        id: '29',
        title: 'Coleccionista de Almas',
        description: 'Consigue todas las almas de jefe',
        completed: false,
        requirement: 'Obtener el alma de todos los jefes del juego'
      },
      {
        id: '30',
        title: 'Maestro del Combate',
        description: 'Derrota a todos los jefes opcionales',
        completed: false,
        requirement: 'Derrotar a todos los jefes que no son obligatorios para completar el juego'
      }
    ]
  },
  reducers: {
    toggleAchievement: (state, action) => {
      const achievementId = action.payload;
      const achievement = state.achievements.find(ach => ach.id === achievementId);
      
      if (achievement) {
        // No permitir desmarcar Alma Oscura manualmente
        if (achievementId === '1' && !achievement.completed) {
          return; 
        }
        
        achievement.completed = !achievement.completed;
        
        // Verificar si todos los logros (excepto Alma Oscura) están completados ya que ese se completa automáticamente
        if (achievementId !== '1') {
          const allCompleted = checkAllAchievementsCompleted(state.achievements);
          const darkSoulAchievement = state.achievements.find(ach => ach.id === '1');
          
          if (allCompleted && darkSoulAchievement && !darkSoulAchievement.completed) {
            darkSoulAchievement.completed = true;
          } else if (!allCompleted && darkSoulAchievement && darkSoulAchievement.completed) {
            darkSoulAchievement.completed = false;
          }
        }
      }
    },
    
    // Nueva acción para forzar la verificación de todos los logros
    checkAllAchievements: (state) => {
      const allCompleted = checkAllAchievementsCompleted(state.achievements);
      const darkSoulAchievement = state.achievements.find(ach => ach.id === '1');
      
      if (darkSoulAchievement) {
        darkSoulAchievement.completed = allCompleted;
      }
    }
  }
});

export const { 
  addBoss, 
  updateBoss, 
  deleteBoss, 
  toggleBossCompletion, 
  incrementAttempts 
} = bossesSlice.actions;

export const { toggleAchievement, checkAllAchievements } = achievementsSlice.actions;

export const store = configureStore({
  reducer: {
    bosses: bossesSlice.reducer,
    achievements: achievementsSlice.reducer
  }
});