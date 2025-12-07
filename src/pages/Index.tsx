import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const GAMES = [
  {
    id: 1,
    title: "Cyberpunk Legends",
    price: 2499,
    discount: 30,
    genre: "RPG",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "Neon Racing",
    price: 1299,
    discount: 15,
    genre: "Racing",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=225&fit=crop",
    featured: true
  },
  {
    id: 3,
    title: "Shadow Warriors",
    price: 1899,
    discount: 0,
    genre: "Action",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=225&fit=crop",
    featured: false
  },
  {
    id: 4,
    title: "Space Odyssey",
    price: 2199,
    discount: 25,
    genre: "Adventure",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&h=225&fit=crop",
    featured: false
  },
  {
    id: 5,
    title: "Pixel Kingdom",
    price: 899,
    discount: 40,
    genre: "Indie",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=225&fit=crop",
    featured: false
  },
  {
    id: 6,
    title: "Battle Royale X",
    price: 0,
    discount: 0,
    genre: "Shooter",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1556438064-2d7646166914?w=400&h=225&fit=crop",
    featured: false
  }
];

const USER_LIBRARY = [
  { id: 1, title: "Cyberpunk Legends", playtime: 45, lastPlayed: "2 дня назад" },
  { id: 3, title: "Shadow Warriors", playtime: 120, lastPlayed: "Вчера" }
];

const WISHLIST = [2, 4];

export default function Index() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<number[]>(WISHLIST);
  const [cart, setCart] = useState<number[]>([]);

  const filteredGames = GAMES.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleWishlist = (gameId: number) => {
    setWishlist(prev =>
      prev.includes(gameId) ? prev.filter(id => id !== gameId) : [...prev, gameId]
    );
  };

  const addToCart = (gameId: number) => {
    if (!cart.includes(gameId)) {
      setCart([...cart, gameId]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold text-gradient">GAMESTORE</h1>
            <nav className="hidden md:flex gap-6">
              <Button
                variant={activeTab === "home" ? "default" : "ghost"}
                onClick={() => setActiveTab("home")}
                className="hover-scale"
              >
                <Icon name="Home" className="mr-2 h-4 w-4" />
                Главная
              </Button>
              <Button
                variant={activeTab === "catalog" ? "default" : "ghost"}
                onClick={() => setActiveTab("catalog")}
                className="hover-scale"
              >
                <Icon name="Grid3x3" className="mr-2 h-4 w-4" />
                Каталог
              </Button>
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                onClick={() => setActiveTab("profile")}
                className="hover-scale"
              >
                <Icon name="User" className="mr-2 h-4 w-4" />
                Профиль
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative hover-scale">
              <Icon name="Heart" className="h-5 w-5" />
              {wishlist.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                  {wishlist.length}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="relative hover-scale">
              <Icon name="ShoppingCart" className="h-5 w-5" />
              {cart.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                  {cart.length}
                </Badge>
              )}
            </Button>
            <Avatar className="glow-hover cursor-pointer">
              <AvatarFallback className="bg-primary text-primary-foreground">GG</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        {activeTab === "home" && (
          <div className="space-y-12 animate-fade-in">
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-8 md:p-12 glow">
              <div className="relative z-10">
                <Badge className="mb-4 animate-glow-pulse">🔥 Горячее предложение</Badge>
                <h2 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">
                  Киберпанк сезон начался!
                </h2>
                <p className="text-xl text-muted-foreground mb-6 max-w-2xl">
                  Погрузись в неоновое будущее со скидками до 50%
                </p>
                <Button size="lg" className="hover-scale glow-hover">
                  <Icon name="Zap" className="mr-2 h-5 w-5" />
                  Смотреть игры
                </Button>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">Топ игр недели</h3>
                <Button variant="ghost" className="hover-scale">
                  Показать всё
                  <Icon name="ArrowRight" className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {GAMES.filter(g => g.featured).map((game, idx) => (
                  <Card
                    key={game.id}
                    className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover-scale glow-hover animate-scale-in"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {game.discount > 0 && (
                        <Badge className="absolute top-2 right-2 bg-destructive">
                          -{game.discount}%
                        </Badge>
                      )}
                      <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => toggleWishlist(game.id)}
                      >
                        <Icon
                          name="Heart"
                          className={wishlist.includes(game.id) ? "fill-red-500 text-red-500" : ""}
                        />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{game.genre}</Badge>
                        <div className="flex items-center gap-1 ml-auto">
                          <Icon name="Star" className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                          <span className="text-sm font-medium">{game.rating}</span>
                        </div>
                      </div>
                      <h4 className="font-bold text-lg mb-3">{game.title}</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          {game.discount > 0 ? (
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground line-through text-sm">
                                {game.price} ₽
                              </span>
                              <span className="text-xl font-bold text-primary">
                                {Math.round(game.price * (1 - game.discount / 100))} ₽
                              </span>
                            </div>
                          ) : (
                            <span className="text-xl font-bold">
                              {game.price === 0 ? "Бесплатно" : `${game.price} ₽`}
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          className="hover-scale"
                          onClick={() => addToCart(game.id)}
                        >
                          <Icon name="ShoppingCart" className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-6">Популярные жанры</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["RPG", "Action", "Racing", "Indie"].map((genre, idx) => (
                  <Card
                    key={genre}
                    className="p-6 text-center cursor-pointer hover-scale glow-hover animate-scale-in"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="text-4xl mb-2">
                      {genre === "RPG" ? "⚔️" : genre === "Action" ? "💥" : genre === "Racing" ? "🏎️" : "🎮"}
                    </div>
                    <h4 className="font-bold">{genre}</h4>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "catalog" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск игр по названию или жанру..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="hover-scale">
                  <Icon name="SlidersHorizontal" className="h-4 w-4 mr-2" />
                  Фильтры
                </Button>
                <Button variant="outline" className="hover-scale">
                  <Icon name="ArrowUpDown" className="h-4 w-4 mr-2" />
                  Сортировка
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map((game, idx) => (
                <Card
                  key={game.id}
                  className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover-scale glow-hover animate-scale-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {game.discount > 0 && (
                      <Badge className="absolute top-2 right-2 bg-destructive">
                        -{game.discount}%
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => toggleWishlist(game.id)}
                    >
                      <Icon
                        name="Heart"
                        className={wishlist.includes(game.id) ? "fill-red-500 text-red-500" : ""}
                      />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{game.genre}</Badge>
                      <div className="flex items-center gap-1 ml-auto">
                        <Icon name="Star" className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm font-medium">{game.rating}</span>
                      </div>
                    </div>
                    <h4 className="font-bold text-lg mb-3">{game.title}</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        {game.discount > 0 ? (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground line-through text-sm">
                              {game.price} ₽
                            </span>
                            <span className="text-xl font-bold text-primary">
                              {Math.round(game.price * (1 - game.discount / 100))} ₽
                            </span>
                          </div>
                        ) : (
                          <span className="text-xl font-bold">
                            {game.price === 0 ? "Бесплатно" : `${game.price} ₽`}
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="hover-scale"
                        onClick={() => addToCart(game.id)}
                      >
                        <Icon name="ShoppingCart" className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            <Card className="glow">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <Avatar className="h-24 w-24 glow-hover">
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-secondary">
                      GG
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-2">GamerPro2024</h2>
                    <p className="text-muted-foreground mb-4">Уровень 42 • Член с января 2024</p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <Badge variant="outline" className="gap-1">
                        <Icon name="Trophy" className="h-3 w-3" />
                        128 достижений
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Icon name="Users" className="h-3 w-3" />
                        45 друзей
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Icon name="Clock" className="h-3 w-3" />
                        256 часов игры
                      </Badge>
                    </div>
                  </div>
                  <Button className="hover-scale">
                    <Icon name="Settings" className="h-4 w-4 mr-2" />
                    Настройки
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="library" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="library">Моя библиотека</TabsTrigger>
                <TabsTrigger value="wishlist">Список желаний</TabsTrigger>
              </TabsList>
              <TabsContent value="library" className="space-y-4 mt-6">
                {USER_LIBRARY.map((game, idx) => (
                  <Card
                    key={game.id}
                    className="hover-scale glow-hover animate-scale-in"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-24 bg-muted rounded-lg flex items-center justify-center">
                            🎮
                          </div>
                          <div>
                            <h4 className="font-bold text-lg">{game.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {game.playtime} часов • Играли {game.lastPlayed}
                            </p>
                          </div>
                        </div>
                        <Button className="hover-scale">
                          <Icon name="Play" className="h-4 w-4 mr-2" />
                          Играть
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              <TabsContent value="wishlist" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {GAMES.filter(g => wishlist.includes(g.id)).map((game, idx) => (
                    <Card
                      key={game.id}
                      className="hover-scale glow-hover animate-scale-in"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img
                            src={game.image}
                            alt={game.title}
                            className="w-32 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-bold mb-1">{game.title}</h4>
                            <Badge variant="outline" className="mb-2">{game.genre}</Badge>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-primary">
                                {game.price === 0 ? "Бесплатно" : `${game.price} ₽`}
                              </span>
                              <Button
                                size="sm"
                                className="hover-scale"
                                onClick={() => addToCart(game.id)}
                              >
                                В корзину
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <footer className="border-t border-border/40 mt-16 py-8">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-4 text-gradient">GAMESTORE</h3>
              <p className="text-sm text-muted-foreground">
                Лучшие игры по лучшим ценам
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Магазин</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Каталог игр</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Новинки</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Скидки</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">FAQ</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Контакты</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Возврат</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Соцсети</h4>
              <div className="flex gap-2">
                <Button size="icon" variant="outline" className="hover-scale">
                  <Icon name="Twitter" className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="hover-scale">
                  <Icon name="Youtube" className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline" className="hover-scale">
                  <Icon name="MessageCircle" className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground pt-8 border-t border-border/40">
            © 2024 GameStore. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
