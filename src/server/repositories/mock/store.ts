import type { Repositories } from '../types';
import type {
  Profile,
  Dish,
  Place,
  MenuItem,
  Usual,
  PlacePraise,
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
import {
  SEED_PROFILES,
  SEED_DISHES,
  SEED_PLACES,
  SEED_MENU_ITEMS,
  SEED_USUALS,
  SEED_PRAISES,
  SEED_REVIEWS,
  SEED_NEARBY,
  SEED_FIND_STEPS,
  SEED_DAYS,
  SEED_DAY_STOPS,
  SEED_TABLES,
  SEED_TABLE_MEMBERS,
  SEED_CONVERSATION_CARDS,
  SEED_TABLE_RITUALS,
  SEED_COMPANY_OFFERS,
} from './data/seed';

class MockDataStore {
  profiles: Profile[] = [];
  dishes: Dish[] = [];
  places: Place[] = [];
  menuItems: MenuItem[] = [];
  usuals: Usual[] = [];
  praises: PlacePraise[] = [];
  reviews: Review[] = [];
  nearbyPoints: NearbyPoint[] = [];
  findSteps: FindStep[] = [];
  eatGuides: EatGuide[] = [];
  priceReports: PriceReport[] = [];
  openConfirmations: OpenConfirmation[] = [];
  passportStamps: PassportStamp[] = [];
  thankYous: ThankYou[] = [];
  days: Day[] = [];
  dayStops: DayStop[] = [];
  tables: Table[] = [];
  tableMembers: TableMember[] = [];
  tableWords: TableWord[] = [];
  conversationCards: ConversationCard[] = [];
  tableRituals: TableRitual[] = [];
  connections: Connection[] = [];
  kudos: HostKudo[] = [];
  companyOffers: CompanyOffer[] = [];
  companyRequests: CompanyRequest[] = [];
  helpRequests: HelpRequest[] = [];
  reports: Report[] = [];
  appConfig: Record<string, AppConfig> = {};

  constructor() {
    this.reset();
  }

  reset() {
    this.profiles = JSON.parse(JSON.stringify(SEED_PROFILES));
    this.dishes = JSON.parse(JSON.stringify(SEED_DISHES));
    this.places = JSON.parse(JSON.stringify(SEED_PLACES));
    this.menuItems = JSON.parse(JSON.stringify(SEED_MENU_ITEMS));
    this.usuals = JSON.parse(JSON.stringify(SEED_USUALS));
    this.praises = JSON.parse(JSON.stringify(SEED_PRAISES));
    this.reviews = JSON.parse(JSON.stringify(SEED_REVIEWS));
    this.nearbyPoints = JSON.parse(JSON.stringify(SEED_NEARBY));
    this.findSteps = JSON.parse(JSON.stringify(SEED_FIND_STEPS));
    this.days = JSON.parse(JSON.stringify(SEED_DAYS));
    this.dayStops = JSON.parse(JSON.stringify(SEED_DAY_STOPS));
    this.tables = JSON.parse(JSON.stringify(SEED_TABLES));
    this.tableMembers = JSON.parse(JSON.stringify(SEED_TABLE_MEMBERS));
    this.tableWords = [];
    this.conversationCards = JSON.parse(JSON.stringify(SEED_CONVERSATION_CARDS));
    this.tableRituals = JSON.parse(JSON.stringify(SEED_TABLE_RITUALS));
    this.companyOffers = JSON.parse(JSON.stringify(SEED_COMPANY_OFFERS));
    this.companyRequests = [];
    this.helpRequests = [];
    this.connections = [];
    this.kudos = [];
    this.reports = [];
    this.priceReports = [];
    this.openConfirmations = [];
    this.passportStamps = [
      {
        id: 'stamp-1',
        user_id: 'user-kenji',
        dish_id: 'dish-pho',
        place_id: 'place-pho-ba-tam',
        usual_id: 'usual-linh',
        created_at: new Date().toISOString(),
      },
    ];
    this.thankYous = [];
    this.appConfig = {
      usd_rate: { key: 'usd_rate', value: 26000 },
      demo_mode: { key: 'demo_mode', value: true },
    };
  }
}

export const store = new MockDataStore();

const simulateLatency = async () => {
  const ms = Number(process.env.MOCK_LATENCY_MS || 0);
  if (ms > 0) {
    await new Promise((res) => setTimeout(res, ms));
  }
};

export function createMockRepositories(): Repositories {
  return {
    profiles: {
      async getById(id) {
        await simulateLatency();
        return store.profiles.find((p) => p.id === id) || null;
      },
      async getByUserId(userId) {
        await simulateLatency();
        return store.profiles.find((p) => p.user_id === userId) || null;
      },
      async getAll() {
        await simulateLatency();
        return [...store.profiles];
      },
      async update(userId, data) {
        await simulateLatency();
        const idx = store.profiles.findIndex((p) => p.user_id === userId);
        if (idx === -1) throw new Error('Profile not found');
        store.profiles[idx] = {
          ...store.profiles[idx],
          ...data,
          updated_at: new Date().toISOString(),
        };
        return store.profiles[idx];
      },
    },
    dishes: {
      async getAll() {
        await simulateLatency();
        return [...store.dishes];
      },
      async getBySlug(slug) {
        await simulateLatency();
        return store.dishes.find((d) => d.slug === slug) || null;
      },
      async getById(id) {
        await simulateLatency();
        return store.dishes.find((d) => d.id === id) || null;
      },
      async create(data) {
        await simulateLatency();
        const dish: Dish = {
          ...data,
          id: `dish-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        store.dishes.push(dish);
        return dish;
      },
    },
    places: {
      async getAll() {
        await simulateLatency();
        return [...store.places];
      },
      async getBySlug(slug) {
        await simulateLatency();
        return store.places.find((p) => p.slug === slug) || null;
      },
      async getById(id) {
        await simulateLatency();
        return store.places.find((p) => p.id === id) || null;
      },
      async create(data) {
        await simulateLatency();
        const place: Place = {
          ...data,
          id: `place-${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        store.places.push(place);
        return place;
      },
      async update(id, data) {
        await simulateLatency();
        const idx = store.places.findIndex((p) => p.id === id);
        if (idx === -1) throw new Error('Place not found');
        store.places[idx] = {
          ...store.places[idx],
          ...data,
          updated_at: new Date().toISOString(),
        };
        return store.places[idx];
      },
    },
    menuItems: {
      async getByPlaceId(placeId) {
        await simulateLatency();
        return store.menuItems.filter((m) => m.place_id === placeId);
      },
    },
    usuals: {
      async getByPlaceId(placeId) {
        await simulateLatency();
        return store.usuals.find((u) => u.place_id === placeId) || null;
      },
    },
    praises: {
      async getByPlaceId(placeId) {
        await simulateLatency();
        return store.praises.filter((p) => p.place_id === placeId);
      },
    },
    reviews: {
      async getByPlaceId(placeId) {
        await simulateLatency();
        return store.reviews.filter((r) => r.place_id === placeId);
      },
      async create(data) {
        await simulateLatency();
        const review: Review = {
          ...data,
          id: `rev-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        store.reviews.push(review);
        return review;
      },
      async getAll() {
        await simulateLatency();
        return [...store.reviews];
      },
      async update(id, data) {
        await simulateLatency();
        const idx = store.reviews.findIndex((r) => r.id === id);
        if (idx === -1) throw new Error('Review not found');
        store.reviews[idx] = { ...store.reviews[idx], ...data };
        return store.reviews[idx];
      },
    },
    nearbyPoints: {
      async getByPlaceId(placeId) {
        await simulateLatency();
        return store.nearbyPoints.filter((n) => n.place_id === placeId);
      },
    },
    findSteps: {
      async getByPlaceId(placeId) {
        await simulateLatency();
        return store.findSteps.filter((f) => f.place_id === placeId);
      },
    },
    eatGuides: {
      async getByDishId(dishId) {
        await simulateLatency();
        return (
          store.eatGuides.find((e) => e.dish_id === dishId) || {
            id: 'guide-default',
            dish_id: dishId,
            steps_en: [
              'Try a spoonful of broth first before seasoning',
              'Add fresh herbs and squeeze of lime',
              'Dip the meat into garlic chili sauce',
              'Slurp noodles hot directly from bowl',
            ],
            table_items: [
              {
                name_vi: 'Chanh tươi',
                name_en: 'Fresh lime wedge',
                intensity: 'Mild',
                description: 'Brightens and cuts through fat',
              },
              {
                name_vi: 'Giấm tỏi',
                name_en: 'Garlic vinegar',
                intensity: 'Tangy',
                description: 'Essential Hanoi broth balancer',
              },
            ],
            stomach_advice_en: 'If sensitive, start easy on raw garlic vinegar and fresh red chili.',
          }
        );
      },
    },
    priceReports: {
      async create(data) {
        await simulateLatency();
        const report: PriceReport = {
          ...data,
          id: `pr-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        store.priceReports.push(report);
        return report;
      },
      async getByPlaceId(placeId) {
        await simulateLatency();
        return store.priceReports.filter((p) => p.place_id === placeId);
      },
    },
    openConfirmations: {
      async create(data) {
        await simulateLatency();
        const conf: OpenConfirmation = {
          ...data,
          id: `conf-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        store.openConfirmations.push(conf);
        return conf;
      },
      async getLatestByPlaceId(placeId) {
        await simulateLatency();
        const items = store.openConfirmations.filter((c) => c.place_id === placeId);
        return items.length > 0 ? items[items.length - 1] : null;
      },
    },
    passportStamps: {
      async getByUserId(userId) {
        await simulateLatency();
        return store.passportStamps.filter((s) => s.user_id === userId);
      },
      async addStamp(data) {
        await simulateLatency();
        const stamp: PassportStamp = {
          ...data,
          id: `stamp-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        store.passportStamps.push(stamp);
        return stamp;
      },
    },
    thankYous: {
      async create(data) {
        await simulateLatency();
        const ty: ThankYou = {
          ...data,
          id: `ty-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        store.thankYous.push(ty);
        return ty;
      },
      async getByLocalId(localId) {
        await simulateLatency();
        return store.thankYous.filter((t) => t.to_local === localId);
      },
    },
    days: {
      async getAll() {
        await simulateLatency();
        return [...store.days];
      },
      async getBySlug(slug) {
        await simulateLatency();
        return store.days.find((d) => d.slug === slug) || null;
      },
      async getStops(dayId) {
        await simulateLatency();
        return store.dayStops.filter((s) => s.day_id === dayId);
      },
    },
    tables: {
      async getAll() {
        await simulateLatency();
        return [...store.tables];
      },
      async getById(id) {
        await simulateLatency();
        return store.tables.find((t) => t.id === id) || null;
      },
      async create(data) {
        await simulateLatency();
        const table: Table = {
          ...data,
          id: `table-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        store.tables.push(table);
        return table;
      },
      async update(id, data) {
        await simulateLatency();
        const idx = store.tables.findIndex((t) => t.id === id);
        if (idx === -1) throw new Error('Table not found');
        store.tables[idx] = { ...store.tables[idx], ...data };
        return store.tables[idx];
      },
      async getMembers(tableId) {
        await simulateLatency();
        return store.tableMembers.filter((m) => m.table_id === tableId && !m.left_at);
      },
      async addMember(tableId, userId, isHost = false) {
        await simulateLatency();
        const member: TableMember = {
          id: `tm-${Date.now()}`,
          table_id: tableId,
          user_id: userId,
          is_host: isHost,
          joined_at: new Date().toISOString(),
        };
        store.tableMembers.push(member);
        return member;
      },
      async removeMember(tableId, userId) {
        await simulateLatency();
        const member = store.tableMembers.find(
          (m) => m.table_id === tableId && m.user_id === userId && !m.left_at
        );
        if (member) {
          member.left_at = new Date().toISOString();
        }
      },
    },
    tableWords: {
      async getByTableId(tableId) {
        await simulateLatency();
        return store.tableWords.filter((w) => w.table_id === tableId);
      },
      async addWord(data) {
        await simulateLatency();
        const word: TableWord = {
          ...data,
          id: `tw-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        store.tableWords.push(word);
        return word;
      },
    },
    conversationCards: {
      async getAll() {
        await simulateLatency();
        return store.conversationCards.filter((c) => c.active);
      },
    },
    tableRituals: {
      async getByDishId(dishId) {
        await simulateLatency();
        return store.tableRituals.filter((r) => r.dish_id === dishId);
      },
    },
    connections: {
      async addConnection(tableId, fromUser, toUser) {
        await simulateLatency();
        const conn: Connection = {
          id: `conn-${Date.now()}`,
          table_id: tableId,
          from_user: fromUser,
          to_user: toUser,
          created_at: new Date().toISOString(),
        };
        store.connections.push(conn);
        return conn;
      },
      async getMutualConnections(tableId, userId) {
        await simulateLatency();
        // Return only target users who have chosen each other
        const userChoices = store.connections
          .filter((c) => c.table_id === tableId && c.from_user === userId)
          .map((c) => c.to_user);

        const mutuals = userChoices.filter((targetUser) => {
          return store.connections.some(
            (c) =>
              c.table_id === tableId &&
              c.from_user === targetUser &&
              c.to_user === userId
          );
        });

        return mutuals;
      },
      async getUserNetwork(userId) {
        await simulateLatency();
        const mutualPairs = store.connections.filter((c1) => {
          if (c1.from_user !== userId) return false;
          return store.connections.some(
            (c2) =>
              c2.table_id === c1.table_id &&
              c2.from_user === c1.to_user &&
              c2.to_user === userId
          );
        });
        const uniquePeople = new Set(mutualPairs.map((p) => p.to_user)).size;
        const uniqueMeals = new Set(mutualPairs.map((p) => p.table_id)).size;
        return { totalPeople: uniquePeople, totalMeals: uniqueMeals };
      },
    },
    kudos: {
      async addKudo(tableId, fromUser, hostId, kind) {
        await simulateLatency();
        const kudo: HostKudo = {
          id: `kudo-${Date.now()}`,
          table_id: tableId,
          from_user: fromUser,
          host_id: hostId,
          kind,
          created_at: new Date().toISOString(),
        };
        store.kudos.push(kudo);
        return kudo;
      },
    },
    company: {
      async getOffers(mode) {
        await simulateLatency();
        if (!mode) return [...store.companyOffers];
        return store.companyOffers.filter((o) => o.mode === mode);
      },
      async createRequest(offerId, travellerId) {
        await simulateLatency();
        const req: CompanyRequest = {
          id: `req-${Date.now()}`,
          offer_id: offerId,
          traveller_id: travellerId,
          status: 'pending',
          created_at: new Date().toISOString(),
        };
        store.companyRequests.push(req);
        return req;
      },
    },
    helpRequests: {
      async create(data) {
        await simulateLatency();
        const req: HelpRequest = {
          ...data,
          id: `help-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        store.helpRequests.push(req);
        return req;
      },
      async getById(id) {
        await simulateLatency();
        return store.helpRequests.find((h) => h.id === id) || null;
      },
      async getOpenQueue() {
        await simulateLatency();
        return store.helpRequests.filter((h) => h.status === 'waiting');
      },
      async update(id, data) {
        await simulateLatency();
        const idx = store.helpRequests.findIndex((h) => h.id === id);
        if (idx === -1) throw new Error('Help request not found');
        store.helpRequests[idx] = { ...store.helpRequests[idx], ...data };
        return store.helpRequests[idx];
      },
    },
    reports: {
      async create(data) {
        await simulateLatency();
        const report: Report = {
          ...data,
          id: `rep-${Date.now()}`,
          created_at: new Date().toISOString(),
        };
        store.reports.push(report);
        return report;
      },
      async getAll() {
        await simulateLatency();
        return [...store.reports];
      },
      async update(id, data) {
        await simulateLatency();
        const idx = store.reports.findIndex((r) => r.id === id);
        if (idx === -1) throw new Error('Report not found');
        store.reports[idx] = { ...store.reports[idx], ...data };
        return store.reports[idx];
      },
    },
    config: {
      async get<T = unknown>(key: string): Promise<T | null> {
        await simulateLatency();
        return (store.appConfig[key]?.value as T) ?? null;
      },
      async set(key, value) {
        await simulateLatency();
        store.appConfig[key] = { key, value };
        return store.appConfig[key];
      },
    },
  };
}
