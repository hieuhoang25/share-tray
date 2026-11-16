import type {
  Profile,
  Dish,
  Place,
  PlacePraise,
  MenuItem,
  Usual,
  Review,
  NearbyPoint,
  FindStep,
  EatGuide,
  PriceReport,
  OpenConfirmation,
  PassportStamp,
  ThankYou,
  Day,
  DayStop,
  Table,
  TableMember,
  TableWord,
  ConversationCard,
  TableRitual,
  Connection,
  HostKudo,
  CompanyOffer,
  CompanyRequest,
  HelpRequest,
  Report,
  AppConfig,
} from '@/types/domain';

export interface Repositories {
  profiles: {
    getById(id: string): Promise<Profile | null>;
    getByUserId(userId: string): Promise<Profile | null>;
    getAll(): Promise<Profile[]>;
    update(userId: string, data: Partial<Profile>): Promise<Profile>;
  };
  dishes: {
    getAll(): Promise<Dish[]>;
    getBySlug(slug: string): Promise<Dish | null>;
    getById(id: string): Promise<Dish | null>;
    create(data: Omit<Dish, 'id' | 'created_at'>): Promise<Dish>;
  };
  places: {
    getAll(): Promise<Place[]>;
    getBySlug(slug: string): Promise<Place | null>;
    getById(id: string): Promise<Place | null>;
    create(data: Omit<Place, 'id' | 'created_at' | 'updated_at'>): Promise<Place>;
    update(id: string, data: Partial<Place>): Promise<Place>;
  };
  menuItems: {
    getByPlaceId(placeId: string): Promise<MenuItem[]>;
  };
  usuals: {
    getByPlaceId(placeId: string): Promise<Usual | null>;
  };
  praises: {
    getByPlaceId(placeId: string): Promise<PlacePraise[]>;
  };
  reviews: {
    getByPlaceId(placeId: string): Promise<Review[]>;
    create(data: Omit<Review, 'id' | 'created_at'>): Promise<Review>;
    getAll(): Promise<Review[]>;
    update(id: string, data: Partial<Review>): Promise<Review>;
  };
  nearbyPoints: {
    getByPlaceId(placeId: string): Promise<NearbyPoint[]>;
  };
  findSteps: {
    getByPlaceId(placeId: string): Promise<FindStep[]>;
  };
  eatGuides: {
    getByDishId(dishId: string): Promise<EatGuide | null>;
  };
  priceReports: {
    create(data: Omit<PriceReport, 'id' | 'created_at'>): Promise<PriceReport>;
    getByPlaceId(placeId: string): Promise<PriceReport[]>;
  };
  openConfirmations: {
    create(data: Omit<OpenConfirmation, 'id' | 'created_at'>): Promise<OpenConfirmation>;
    getLatestByPlaceId(placeId: string): Promise<OpenConfirmation | null>;
  };
  passportStamps: {
    getByUserId(userId: string): Promise<PassportStamp[]>;
    addStamp(data: Omit<PassportStamp, 'id' | 'created_at'>): Promise<PassportStamp>;
  };
  thankYous: {
    create(data: Omit<ThankYou, 'id' | 'created_at'>): Promise<ThankYou>;
    getByLocalId(localId: string): Promise<ThankYou[]>;
  };
  days: {
    getAll(): Promise<Day[]>;
    getBySlug(slug: string): Promise<Day | null>;
    getStops(dayId: string): Promise<DayStop[]>;
  };
  tables: {
    getAll(): Promise<Table[]>;
    getById(id: string): Promise<Table | null>;
    create(data: Omit<Table, 'id' | 'created_at'>): Promise<Table>;
    update(id: string, data: Partial<Table>): Promise<Table>;
    getMembers(tableId: string): Promise<TableMember[]>;
    addMember(tableId: string, userId: string, isHost?: boolean): Promise<TableMember>;
    removeMember(tableId: string, userId: string): Promise<void>;
  };
  tableWords: {
    getByTableId(tableId: string): Promise<TableWord[]>;
    addWord(data: Omit<TableWord, 'id' | 'created_at'>): Promise<TableWord>;
  };
  conversationCards: {
    getAll(): Promise<ConversationCard[]>;
  };
  tableRituals: {
    getByDishId(dishId: string): Promise<TableRitual[]>;
  };
  connections: {
    addConnection(tableId: string, fromUser: string, toUser: string): Promise<Connection>;
    getMutualConnections(tableId: string, userId: string): Promise<string[]>;
    getUserNetwork(userId: string): Promise<{ totalPeople: number; totalMeals: number }>;
  };
  kudos: {
    addKudo(tableId: string, fromUser: string, hostId: string, kind: string): Promise<HostKudo>;
  };
  company: {
    getOffers(mode?: 'meal' | 'guide'): Promise<CompanyOffer[]>;
    createRequest(offerId: string, travellerId: string): Promise<CompanyRequest>;
  };
  helpRequests: {
    create(data: Omit<HelpRequest, 'id' | 'created_at'>): Promise<HelpRequest>;
    getById(id: string): Promise<HelpRequest | null>;
    getOpenQueue(): Promise<HelpRequest[]>;
    update(id: string, data: Partial<HelpRequest>): Promise<HelpRequest>;
  };
  reports: {
    create(data: Omit<Report, 'id' | 'created_at'>): Promise<Report>;
    getAll(): Promise<Report[]>;
    update(id: string, data: Partial<Report>): Promise<Report>;
  };
  config: {
    get<T = unknown>(key: string): Promise<T | null>;
    set(key: string, value: Record<string, unknown> | string | number | boolean): Promise<AppConfig>;
  };
}
