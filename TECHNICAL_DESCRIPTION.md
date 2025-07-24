# TactiForge - Технічний опис системи

## Загальний огляд

TactiForge — це веб-додаток для порівняння та візуалізації військового озброєння з використанням 3D-технологій. Система побудована за архітектурою клієнт-сервер з використанням сучасних веб-технологій.

## Архітектура системи

### Загальна структура
```
TactiForge/
├── frontend/     # React + TypeScript клієнт
├── backend/      # Node.js + Express API сервер
└── README.md
```

Система використовує **монорепозиторій** підхід з окремими директоріями для фронтенду та бекенду.

## Технологічний стек

### Frontend
- **React 18** з TypeScript для користувацького інтерфейсу
- **Babylon.js 7.31** для 3D-рендерингу озброєння
- **Redux Toolkit** для управління станом
- **Vite** як збирач та сервер розробки
- **TailwindCSS** для стилізації
- **Framer Motion** для анімацій

### Backend
- **Node.js** з **Express.js** фреймворком
- **MongoDB** з **Mongoose ODM** для бази даних
- **JWT** для автентифікації
- **bcrypt** для хешування паролів
- **Joi** для валідації даних

## Структура бази даних

### Модель зброї
```javascript
const weaponSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  year: { type: String, required: true },
  media: { type: String, required: true },
  shortText: { type: String, required: true },
}, {
  timestamps: true,
  versionKey: false,
});
```

### Модель користувача
```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
  versionKey: false,
});

// Видалення пароля з JSON відповіді
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
```

## Типізація даних (TypeScript)

### Типи зброї
```typescript
export type WeaponType = {
  _id: string;
  name: string;
  country: string;
  year: string;
  media: string;
  shortText: string;
  characteristics: Characteristic[];
  operation: string;
  sources: string[];
};

export type Characteristic = {
  aspect: string;
  value: string;
};

export type WeaponPairType = {
  name: string;
  weapons: WeaponType[];
};
```

## API архітектура

### Ініціалізація сервера
```javascript
const bootstrap = async () => {
  await initMongoDB();
  setupServer();
};

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());
  app.use('/', router);
  app.use(errorHandler);
};
```

### API ендпоінти для зброї
```javascript
// Отримання всіх пар зброї
app.get('/weapons/', async (req, res) => {
  const weapons = await WeaponsCollection.find();
  res.json(weapons);
});

// Отримання конкретної зброї
app.get('/weapons/:id', async (req, res) => {
  const weapon = await WeaponsCollection.findById(req.params.id);
  res.json(weapon);
});
```

## Frontend архітектура

### Маршрутизація додатку
```jsx
export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/laboratory" element={<LaboratoryPage />} />
        <Route path="/weapons/:id" element={<WeaponPage />} />
        <Route path="/admin/" element={<AdminPage />} />
      </Routes>
    </Suspense>
  );
}
```

### Redux конфігурація
```typescript
export const store = configureStore({
  reducer: {
    audio: audioReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

## 3D-рендеринг з Babylon.js

### Ініціалізація 3D-сцени
```typescript
useEffect(() => {
  if (canvasRef.current) {
    const engine = new Engine(canvasRef.current, true);
    const scene = new Scene(engine);
    
    // Налаштування камери
    const camera = new FreeCamera("camera", new Vector3(0, 0, -5), scene);
    camera.attachToCanvas(canvasRef.current, true);
    
    // Освітлення
    new HemisphericLight("hemiLight", new Vector3(0, 1, 0), scene);
    new DirectionalLight("dirLight", new Vector3(-1, -1, 0), scene);
    
    // Завантаження 3D моделі
    SceneLoader.ImportMeshAsync("", `/models/`, `${media}.glb`, scene)
      .then((result) => {
        modelRef.current = result.meshes[0];
        setLoading(false);
      });
  }
}, [media]);
```

### Анімація 3D об'єктів
```typescript
const animateScene = () => {
  if (modelRef.current && cameraRef.current) {
    // Плавне обертання моделі
    smoothRotation.current += rotationVelocity.current;
    modelRef.current.rotation.y = smoothRotation.current;
    
    // Інерційна зупинка
    rotationVelocity.current *= 0.98;
  }
};
```

## Сервіси та API інтеграція

### HTTP клієнт для зброї
```typescript
const URL = `${apiDomain}/weapons`;

export const fetchAllWeaponPairs = async () => {
  const response = await axios.get(`${URL}/`);
  return response.data;
};

export const fetchWeaponWithId = async (id: string) => {
  const response = await axios.get(`${URL}/${id}`);
  return response.data;
};

export const addWeapon = async (payload: WeaponType) => {
  const response = await axios.post(`${URL}/`, payload);
  return response.data;
};
```

## Компонентна архітектура

### Головна сторінка лабораторії
```jsx
export default function LaboratoryPage() {
  const [pairNumber, setPairNumber] = useState(0);
  const [animation, setAnimation] = useState("Idle");
  const [weaponsData, setWeaponsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllWeaponPairs();
        setWeaponsData(data.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <HomeWrapper>
      <SoldierScene animation={animation} />
      <Chat chatOpen={chatOpen} setChatOpen={setChatOpen} />
    </HomeWrapper>
  );
}
```

## Система автентифікації

### JWT токени
```javascript
export const createSession = async (userId) => {
  const accessToken = jwt.sign({ sub: userId }, env('JWT_SECRET'), {
    expiresIn: '15m',
  });
  
  const refreshToken = jwt.sign({ sub: userId }, env('JWT_SECRET'), {
    expiresIn: '30d',
  });

  return { accessToken, refreshToken };
};
```

### Контролер автентифікації
```javascript
export const loginUserController = async (req, res, next) => {
  const session = await loginUser(req.body);

  // Встановлення HTTP-only cookies для безпеки
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in',
    data: { accessToken: session.accessToken },
  });
};
```

### Middleware авторизації
```javascript
export const authenticate = async (req, res, next) => {
  const token = req.cookies.accessToken;
  
  if (!token) {
    return next(createHttpError(401, 'Access token required'));
  }

  try {
    const { sub: userId } = jwt.verify(token, env('JWT_SECRET'));
    const user = await UsersCollection.findById(userId);
    
    req.user = user;
    next();
  } catch (error) {
    next(createHttpError(401, 'Access token expired'));
  }
};
```

## Валідація даних

### Схема валідації зброї
```javascript
export const createWeaponSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  country: Joi.string().min(3).max(20).required(),
  year: Joi.string().required(),
  media: Joi.string().required(),
  shortText: Joi.string().min(10).max(1000).required(),
});
```

## Особливості реалізації

### Інтерактивна 3D-візуалізація
- Використання Babylon.js для рендерингу 3D-моделей озброєння
- Підтримка GLTF/GLB форматів для 3D-моделей  
- Плавні анімації та переходи між станами
- Responsive дизайн для різних розмірів екранів

### Система чату та аудіо
Додаток включає інтерактивну систему чату з аудіо підтримкою:

```typescript
export const useAudio = () => {
  const dispatch = useDispatch();
  const audioSrc = useSelector(selectAudioSrc);
  const isPlaying = useSelector(selectIsPlaying);

  const playAudio = (src: string) => {
    dispatch(setAudioSrc(src));
    dispatch(setPlaying(true));
  };

  const stopAudio = () => {
    dispatch(setPlaying(false));
  };

  return { audioSrc, isPlaying, playAudio, stopAudio };
};
```

### Chat компонент
```jsx
export default function Chat({ 
  chatOpen, 
  changeChatStatus, 
  pair, 
  setAnimatedWeapon 
}: Props) {
  const { audioSrc, isPlaying, playAudio, stopAudio } = useAudio();
  
  return (
    <div className={clsx(css.chat, chatOpen && css.open)}>
      <QuestionsList 
        pair={pair} 
        setAnimatedWeapon={setAnimatedWeapon} 
      />
    </div>
  );
}
```

### Оптимізація продуктивності
- Lazy Loading компонентів для швидкого завантаження
- Code splitting на рівні маршрутів
- Компресія статичних ресурсів
- Кешування API запитів

### Безпека
- JWT автентифікація з refresh токенами
- Хешування паролів за допомогою bcrypt
- CORS налаштування для захисту від XSS
- Валідація вхідних даних на сервері та клієнті

## Конфігурація розробки

### Vite конфігурація
```typescript
export default defineConfig({
  plugins: [react()],
  // Оптимізація для великих бандлів (Babylon.js)
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'babylon': ['@babylonjs/core', '@babylonjs/loaders'],
        }
      }
    }
  }
});
```

### TailwindCSS налаштування  
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Кастомні стилі для 3D інтерфейсу
    },
  },
  plugins: [],
};
```

## Збірка та розгортання

### Команди збірки
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm start
```

### Конфігурація оточення
```bash
# Backend .env
PORT=3000
MONGODB_USER=username
MONGODB_PASSWORD=password
MONGODB_URL=cluster.mongodb.net
JWT_SECRET=secret_key
```

## Висновки

TactiForge представляє собою сучасний веб-додаток, що поєднує передові технології 3D-візуалізації з надійною backend архітектурою. Система забезпечує інтуїтивний користувацький досвід для порівняння військового озброєння через інтерактивні 3D-моделі та детальну інформаційну базу.

Архітектура системи дозволяє легко масштабувати функціонал та додавати нові типи озброєння, підтримуючи високу продуктивність та безпеку даних.