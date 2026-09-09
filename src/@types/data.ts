export type tripType = {
  tripID: number | null;
  basePrice: number | null;
  totalPrice: number | null;
  tripDuration: number | null;
  startTime: string | null;
  startTripLocation: string | null;
  endTime: string | null;
  durationSpentInMinutes: number | null;
  distanceToPickup: string | null;
  requestLocation: string | null;
  requestDateTime: string | null;
  requestAcceptanceTime: string | null;
  pickupLocation: string | null;
  dropoffLocation: string | null;
  totalDistanceCovered: number | null;
  cancelLocation: string | null;
  cancelDateTime: string | null;
  status: string | null;
  isPaymentCompleted: boolean;
  tripDate: string | null;
  driver: driverType;
  rider: riderType;
};
export type driverType = {
  userID: number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  phone: string | null;
  gender: string | null;
  address: string | null;
  emailVerifiedStatus: string | null;
  role: string | null;
  dateOfBirth: string | null;
  isActive: boolean;
  dateJoined: string | null;
  applicationName: string | null;
  image: any | null;
  dateAdded: string | null;
  state: {
    stateID: number | null;
    stateName: string | null;
    country: string | null;
  };
  lga: {
    lgaID: number | null;
    lgaName: string | null;
    stateName: string | null;
  };
  bank: {
    accountName: string | null;
    accountNumber: string | null;
    bvnNumber: string | null;
    bankName: string | null;
    abbreviation: string | null;
    bankCode: string | null;
  };
  profile: {
    driverID: number | null;
    userID: string | null;
    numOfCompletedRides: number | null;
    driversLicenceNumber: string | null;
    driversLicenceFront: string | null;
    driversLicenceBack: string | null;
    vehicle: string | null;
    reviews: [];
  };
  wallet: {
    escrowBalance: string | null;
    withdrawableBalance: string | null;
    lastUpdate: string | null;
  };
};
export type riderType = {
  userID: number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  phone: string | null;
  gender: string | null;
  address: string | null;
  emailVerifiedStatus: string | null;
  role: string | null;
  dateOfBirth: string | null;
  isActive: boolean;
  dateJoined: string | null;
  applicationName: string | null;
  image: any | null;
  dateAdded: string | null;
  state: {
    stateID: number | null;
    stateName: string | null;
    country: string | null;
  };
  lga: {
    lgaID: number | null;
    lgaName: string | null;
    stateName: string | null;
  };
  bank: {
    accountName: string | null;
    accountNumber: string | null;
    bvnNumber: string | null;
    bankName: string | null;
    abbreviation: string | null;
    bankCode: string | null;
  };
  profile: {
    riderID: number | null;
    userID: string | null;
    homeLocation: {
      homeAddress: string | null
    };
    workLocation: {
      workAddress: string | null
    };
    completedRides: number | null;
  };
  wallet: {
    escrowBalance: string | null;
    withdrawableBalance: string | null;
    lastUpdate: string | null;
  };
};

export type consumerType = {
  userID: number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  phone: string | null;
  gender: string | null;
  address: string | null;
  emailVerifiedStatus: string | null;
  role: string | null;
  dateOfBirth: string | null;
  isActive: boolean;
  dateJoined: string | null;
  applicationName: string | null;
  image: any | null;
  dateAdded: string | null;
  state: {
    stateID: number | null;
    stateName: string | null;
    country: string | null;
  };
  lga: {
    lgaID: number | null;
    lgaName: string | null;
    stateName: string | null;
  };
  bank: {
    accountName: string | null;
    accountNumber: string | null;
    bvnNumber: string | null;
    bankName: string | null;
    abbreviation: string | null;
    bankCode: string | null;
  };
  profile: {
    consumerID: number | null;
    userID: string | null;
  };
  wallet: {
    escrowBalance: string | null;
    withdrawableBalance: string | null;
    lastUpdate: string | null;
  };
};
export type merchantType = {
  userID: number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  phone: string | null;
  gender: string | null;
  address: string | null;
  emailVerifiedStatus: string | null;
  role: string | null;
  dateOfBirth: string | null;
  isActive: boolean;
  dateJoined: string | null;
  applicationName: string | null;
  image: any | null;
  dateAdded: string | null;
  state: {
    stateID: number | null;
    stateName: string | null;
    country: string | null;
  };
  lga: {
    lgaID: number | null;
    lgaName: string | null;
    stateName: string | null;
  };
  bank: {
    accountName: string | null;
    accountNumber: string | null;
    bvnNumber: string | null;
    bankName: string | null;
    abbreviation: string | null;
    bankCode: string | null;
  };
  profile: {
    merchantID: number | null;
    userID: string | null;
    merchantType: string | null;
    bio: string | null;
    merchantCategory: {
      categoryID: number | null;
      categoryName: string | null;
      isActive: boolean;
    };
    merchantInfo: {
      cacNumber: string | null;
      cacDocument: string | null;
      identityType: string | null;
      identityDocument: string | null;
    };
  };
  wallet: {
    escrowBalance: string | null;
    withdrawableBalance: string | null;
    lastUpdate: string | null;
  };
};
export type adminType = {
  userID: number | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  phone: string | null;
  gender: string | null;
  address: string | null;
  emailVerifiedStatus: string | null;
  role: string | null;
  dateOfBirth: string | null;
  isActive: boolean;
  dateJoined: string | null;
  applicationName: string | null;
  image: any | null;
  dateAdded: string | null;
  state: {
    stateID: number | null;
    stateName: string | null;
    country: string | null;
  } | null;
  lga: {
    lgaID: number | null;
    lgaName: string | null;
    stateName: string | null;
  } | null;
  bank: {
    accountName: string | null;
    accountNumber: string | null;
    bvnNumber: string | null;
    bankName: string | null;
    abbreviation: string | null;
    bankCode: string | null;
  } | null;
  profile: {
    adminID: number | null;
    userID: number | null;
    adminType: string | null;
    status: boolean;
  };
  wallet: {
    escrowBalance: string | null;
    withdrawableBalance: string | null;
    lastUpdate: string | null;
  };
};
export type jobType = {};
