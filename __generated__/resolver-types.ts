import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type BlackCards = {
   __typename?: 'BlackCards';
  pick?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
};

export type CardSet = {
   __typename?: 'cardSet';
  setName?: Maybe<Scalars['String']>;
  blackCards?: Maybe<Array<Maybe<BlackCards>>>;
  whiteCards?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UserCards = {
   __typename?: 'UserCards';
  user: Scalars['String'];
  blackCard: Scalars['String'];
  cards: Array<Maybe<Scalars['String']>>;
};

export type Query = {
   __typename?: 'Query';
  cardSets?: Maybe<Array<Maybe<CardSet>>>;
  cardSet?: Maybe<CardSet>;
  getUserCards: UserCards;
  user?: Maybe<User>;
  getCurrentGame?: Maybe<Game>;
  getGame?: Maybe<Game>;
};


export type QueryCardSetArgs = {
  setName: Scalars['String'];
};


export type QueryGetUserCardsArgs = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};


export type QueryGetCurrentGameArgs = {
  name: Scalars['String'];
};


export type QueryGetGameArgs = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};

export type User = {
   __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type RegisterResponse = {
   __typename?: 'RegisterResponse';
  error: Scalars['String'];
  user: User;
};

export type LoginResponse = {
   __typename?: 'LoginResponse';
  error?: Maybe<Scalars['String']>;
  user: User;
};

export type UpdateUserArgs = {
  _id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  registerUser?: Maybe<RegisterResponse>;
  loginUser?: Maybe<LoginResponse>;
  updateUser: User;
  createGame?: Maybe<Game>;
  joinGame?: Maybe<Game>;
  leaveGame: Scalars['Boolean'];
  startGame?: Maybe<GameDetails>;
  stopGame?: Maybe<GameDetails>;
  selectCard: Scalars['Boolean'];
  selectWinningCard: Scalars['Boolean'];
};


export type MutationRegisterUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  args: UpdateUserArgs;
};


export type MutationCreateGameArgs = {
  gameId: Scalars['String'];
  host: Scalars['String'];
};


export type MutationJoinGameArgs = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};


export type MutationLeaveGameArgs = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};


export type MutationStartGameArgs = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};


export type MutationStopGameArgs = {
  gameId: Scalars['String'];
  name: Scalars['String'];
};


export type MutationSelectCardArgs = {
  gameId: Scalars['String'];
  name: Scalars['String'];
  card: Scalars['String'];
};


export type MutationSelectWinningCardArgs = {
  gameId: Scalars['String'];
  name: Scalars['String'];
  card: Scalars['String'];
  winningUser: Scalars['String'];
};

export type Game = {
   __typename?: 'Game';
  gameId?: Maybe<Scalars['String']>;
  userJoined?: Maybe<UserJoin>;
  userLeft?: Maybe<UserLeft>;
  host?: Maybe<Scalars['String']>;
  users: Array<GameUsers>;
};

export type GamePlayers = {
   __typename?: 'GamePlayers';
  gameId: Scalars['String'];
  event: Scalars['String'];
  host?: Maybe<Scalars['String']>;
  userJoined?: Maybe<UserJoin>;
  userLeft?: Maybe<UserLeft>;
  user?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<GamePlayer>>>;
};

export type GameUsers = {
   __typename?: 'GameUsers';
  host: Scalars['String'];
  name: Scalars['String'];
  points?: Maybe<Scalars['String']>;
};

export type GamePlayer = {
   __typename?: 'GamePlayer';
  name: Scalars['String'];
  points: Scalars['Int'];
  cardSelected?: Maybe<Scalars['Boolean']>;
};

export type UserJoin = {
   __typename?: 'UserJoin';
  name?: Maybe<Scalars['String']>;
};

export type UserLeft = {
   __typename?: 'UserLeft';
  name?: Maybe<Scalars['String']>;
};

export type CardsToJudge = {
   __typename?: 'CardsToJudge';
  name: Scalars['String'];
  cardName: Scalars['String'];
};

export type GameDetails = {
   __typename?: 'GameDetails';
  gameId: Scalars['String'];
  event: Scalars['String'];
  blackCard: Scalars['String'];
  running?: Maybe<Scalars['Boolean']>;
  roundStatus?: Maybe<Scalars['String']>;
  cardCzar?: Maybe<Scalars['String']>;
  cardsToJudge?: Maybe<Array<Maybe<CardsToJudge>>>;
};

export type CardsDealt = {
   __typename?: 'CardsDealt';
  gameId?: Maybe<Scalars['String']>;
  blackCard: Scalars['String'];
  user?: Maybe<Scalars['String']>;
  cards?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Subscription = {
   __typename?: 'Subscription';
  game?: Maybe<Game>;
  gameDetails?: Maybe<GameDetails>;
  gamePlayers?: Maybe<GamePlayers>;
  cardsDealt?: Maybe<CardsDealt>;
};


export type SubscriptionGameArgs = {
  gameId: Scalars['String'];
};


export type SubscriptionGameDetailsArgs = {
  gameId: Scalars['String'];
};


export type SubscriptionGamePlayersArgs = {
  gameId: Scalars['String'];
};


export type SubscriptionCardsDealtArgs = {
  gameId: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}




export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  BlackCards: ResolverTypeWrapper<BlackCards>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  cardSet: ResolverTypeWrapper<CardSet>,
  UserCards: ResolverTypeWrapper<UserCards>,
  Query: ResolverTypeWrapper<{}>,
  User: ResolverTypeWrapper<User>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  RegisterResponse: ResolverTypeWrapper<RegisterResponse>,
  LoginResponse: ResolverTypeWrapper<LoginResponse>,
  UpdateUserArgs: UpdateUserArgs,
  Mutation: ResolverTypeWrapper<{}>,
  Game: ResolverTypeWrapper<Game>,
  GamePlayers: ResolverTypeWrapper<GamePlayers>,
  GameUsers: ResolverTypeWrapper<GameUsers>,
  GamePlayer: ResolverTypeWrapper<GamePlayer>,
  UserJoin: ResolverTypeWrapper<UserJoin>,
  UserLeft: ResolverTypeWrapper<UserLeft>,
  CardsToJudge: ResolverTypeWrapper<CardsToJudge>,
  GameDetails: ResolverTypeWrapper<GameDetails>,
  CardsDealt: ResolverTypeWrapper<CardsDealt>,
  Subscription: ResolverTypeWrapper<{}>,
  CacheControlScope: CacheControlScope,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  BlackCards: BlackCards,
  Int: Scalars['Int'],
  cardSet: CardSet,
  UserCards: UserCards,
  Query: {},
  User: User,
  ID: Scalars['ID'],
  RegisterResponse: RegisterResponse,
  LoginResponse: LoginResponse,
  UpdateUserArgs: UpdateUserArgs,
  Mutation: {},
  Game: Game,
  GamePlayers: GamePlayers,
  GameUsers: GameUsers,
  GamePlayer: GamePlayer,
  UserJoin: UserJoin,
  UserLeft: UserLeft,
  CardsToJudge: CardsToJudge,
  GameDetails: GameDetails,
  CardsDealt: CardsDealt,
  Subscription: {},
  CacheControlScope: CacheControlScope,
  Upload: Scalars['Upload'],
};

export type BlackCardsResolvers<ContextType = any, ParentType extends ResolversParentTypes['BlackCards'] = ResolversParentTypes['BlackCards']> = {
  pick?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type CardSetResolvers<ContextType = any, ParentType extends ResolversParentTypes['cardSet'] = ResolversParentTypes['cardSet']> = {
  setName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  blackCards?: Resolver<Maybe<Array<Maybe<ResolversTypes['BlackCards']>>>, ParentType, ContextType>,
  whiteCards?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserCardsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserCards'] = ResolversParentTypes['UserCards']> = {
  user?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  blackCard?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  cards?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  cardSets?: Resolver<Maybe<Array<Maybe<ResolversTypes['cardSet']>>>, ParentType, ContextType>,
  cardSet?: Resolver<Maybe<ResolversTypes['cardSet']>, ParentType, ContextType, RequireFields<QueryCardSetArgs, 'setName'>>,
  getUserCards?: Resolver<ResolversTypes['UserCards'], ParentType, ContextType, RequireFields<QueryGetUserCardsArgs, 'gameId' | 'name'>>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  getCurrentGame?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType, RequireFields<QueryGetCurrentGameArgs, 'name'>>,
  getGame?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType, RequireFields<QueryGetGameArgs, 'gameId' | 'name'>>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type RegisterResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterResponse'] = ResolversParentTypes['RegisterResponse']> = {
  error?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  registerUser?: Resolver<Maybe<ResolversTypes['RegisterResponse']>, ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'email' | 'password'>>,
  loginUser?: Resolver<Maybe<ResolversTypes['LoginResponse']>, ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'email' | 'password'>>,
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'args'>>,
  createGame?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType, RequireFields<MutationCreateGameArgs, 'gameId' | 'host'>>,
  joinGame?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType, RequireFields<MutationJoinGameArgs, 'gameId' | 'name'>>,
  leaveGame?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationLeaveGameArgs, 'gameId' | 'name'>>,
  startGame?: Resolver<Maybe<ResolversTypes['GameDetails']>, ParentType, ContextType, RequireFields<MutationStartGameArgs, 'gameId' | 'name'>>,
  stopGame?: Resolver<Maybe<ResolversTypes['GameDetails']>, ParentType, ContextType, RequireFields<MutationStopGameArgs, 'gameId' | 'name'>>,
  selectCard?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSelectCardArgs, 'gameId' | 'name' | 'card'>>,
  selectWinningCard?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSelectWinningCardArgs, 'gameId' | 'name' | 'card' | 'winningUser'>>,
};

export type GameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = {
  gameId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  userJoined?: Resolver<Maybe<ResolversTypes['UserJoin']>, ParentType, ContextType>,
  userLeft?: Resolver<Maybe<ResolversTypes['UserLeft']>, ParentType, ContextType>,
  host?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  users?: Resolver<Array<ResolversTypes['GameUsers']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GamePlayersResolvers<ContextType = any, ParentType extends ResolversParentTypes['GamePlayers'] = ResolversParentTypes['GamePlayers']> = {
  gameId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  event?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  host?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  userJoined?: Resolver<Maybe<ResolversTypes['UserJoin']>, ParentType, ContextType>,
  userLeft?: Resolver<Maybe<ResolversTypes['UserLeft']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['GamePlayer']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GameUsersResolvers<ContextType = any, ParentType extends ResolversParentTypes['GameUsers'] = ResolversParentTypes['GameUsers']> = {
  host?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  points?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GamePlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['GamePlayer'] = ResolversParentTypes['GamePlayer']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  points?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  cardSelected?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserJoinResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserJoin'] = ResolversParentTypes['UserJoin']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserLeftResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserLeft'] = ResolversParentTypes['UserLeft']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type CardsToJudgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CardsToJudge'] = ResolversParentTypes['CardsToJudge']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  cardName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GameDetailsResolvers<ContextType = any, ParentType extends ResolversParentTypes['GameDetails'] = ResolversParentTypes['GameDetails']> = {
  gameId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  event?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  blackCard?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  running?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  roundStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  cardCzar?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  cardsToJudge?: Resolver<Maybe<Array<Maybe<ResolversTypes['CardsToJudge']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type CardsDealtResolvers<ContextType = any, ParentType extends ResolversParentTypes['CardsDealt'] = ResolversParentTypes['CardsDealt']> = {
  gameId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  blackCard?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  cards?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  game?: SubscriptionResolver<Maybe<ResolversTypes['Game']>, "game", ParentType, ContextType, RequireFields<SubscriptionGameArgs, 'gameId'>>,
  gameDetails?: SubscriptionResolver<Maybe<ResolversTypes['GameDetails']>, "gameDetails", ParentType, ContextType, RequireFields<SubscriptionGameDetailsArgs, 'gameId'>>,
  gamePlayers?: SubscriptionResolver<Maybe<ResolversTypes['GamePlayers']>, "gamePlayers", ParentType, ContextType, RequireFields<SubscriptionGamePlayersArgs, 'gameId'>>,
  cardsDealt?: SubscriptionResolver<Maybe<ResolversTypes['CardsDealt']>, "cardsDealt", ParentType, ContextType, RequireFields<SubscriptionCardsDealtArgs, 'gameId'>>,
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type Resolvers<ContextType = any> = {
  BlackCards?: BlackCardsResolvers<ContextType>,
  cardSet?: CardSetResolvers<ContextType>,
  UserCards?: UserCardsResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  RegisterResponse?: RegisterResponseResolvers<ContextType>,
  LoginResponse?: LoginResponseResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Game?: GameResolvers<ContextType>,
  GamePlayers?: GamePlayersResolvers<ContextType>,
  GameUsers?: GameUsersResolvers<ContextType>,
  GamePlayer?: GamePlayerResolvers<ContextType>,
  UserJoin?: UserJoinResolvers<ContextType>,
  UserLeft?: UserLeftResolvers<ContextType>,
  CardsToJudge?: CardsToJudgeResolvers<ContextType>,
  GameDetails?: GameDetailsResolvers<ContextType>,
  CardsDealt?: CardsDealtResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  Upload?: GraphQLScalarType,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
