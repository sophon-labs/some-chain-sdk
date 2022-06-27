/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { DecCoin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "evmos.incentives.v1";

/**
 * Incentive defines an instance that organizes distribution conditions for a
 * given smart contract
 */
export interface Incentive {
  /** contract address */
  contract: string;
  /** denoms and percentage of rewards to be allocated */
  allocations: DecCoin[];
  /** number of remaining epochs */
  epochs: number;
  /** distribution start time */
  startTime?: Date;
  /** cumulative gas spent by all gasmeters of the incentive during the epoch */
  totalGas: Long;
}

/** GasMeter tracks the cumulative gas spent per participant in one epoch */
export interface GasMeter {
  /** hex address of the incentivized contract */
  contract: string;
  /** participant address that interacts with the incentive */
  participant: string;
  /** cumulative gas spent during the epoch */
  cumulativeGas: Long;
}

/** RegisterIncentiveProposal is a gov Content type to register an incentive */
export interface RegisterIncentiveProposal {
  /** title of the proposal */
  title: string;
  /** proposal description */
  description: string;
  /** contract address */
  contract: string;
  /** denoms and percentage of rewards to be allocated */
  allocations: DecCoin[];
  /** number of remaining epochs */
  epochs: number;
}

/** CancelIncentiveProposal is a gov Content type to cancel an incentive */
export interface CancelIncentiveProposal {
  /** title of the proposal */
  title: string;
  /** proposal description */
  description: string;
  /** contract address */
  contract: string;
}

function createBaseIncentive(): Incentive {
  return {
    contract: "",
    allocations: [],
    epochs: 0,
    startTime: undefined,
    totalGas: Long.UZERO,
  };
}

export const Incentive = {
  encode(
    message: Incentive,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.contract !== "") {
      writer.uint32(10).string(message.contract);
    }
    for (const v of message.allocations) {
      DecCoin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.epochs !== 0) {
      writer.uint32(24).uint32(message.epochs);
    }
    if (message.startTime !== undefined) {
      Timestamp.encode(
        toTimestamp(message.startTime),
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (!message.totalGas.isZero()) {
      writer.uint32(40).uint64(message.totalGas);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Incentive {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIncentive();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contract = reader.string();
          break;
        case 2:
          message.allocations.push(DecCoin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.epochs = reader.uint32();
          break;
        case 4:
          message.startTime = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.totalGas = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Incentive {
    return {
      contract: isSet(object.contract) ? String(object.contract) : "",
      allocations: Array.isArray(object?.allocations)
        ? object.allocations.map((e: any) => DecCoin.fromJSON(e))
        : [],
      epochs: isSet(object.epochs) ? Number(object.epochs) : 0,
      startTime: isSet(object.startTime)
        ? fromJsonTimestamp(object.startTime)
        : undefined,
      totalGas: isSet(object.totalGas)
        ? Long.fromValue(object.totalGas)
        : Long.UZERO,
    };
  },

  toJSON(message: Incentive): unknown {
    const obj: any = {};
    message.contract !== undefined && (obj.contract = message.contract);
    if (message.allocations) {
      obj.allocations = message.allocations.map((e) =>
        e ? DecCoin.toJSON(e) : undefined
      );
    } else {
      obj.allocations = [];
    }
    message.epochs !== undefined && (obj.epochs = Math.round(message.epochs));
    message.startTime !== undefined &&
      (obj.startTime = message.startTime.toISOString());
    message.totalGas !== undefined &&
      (obj.totalGas = (message.totalGas || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Incentive>, I>>(
    object: I
  ): Incentive {
    const message = createBaseIncentive();
    message.contract = object.contract ?? "";
    message.allocations =
      object.allocations?.map((e) => DecCoin.fromPartial(e)) || [];
    message.epochs = object.epochs ?? 0;
    message.startTime = object.startTime ?? undefined;
    message.totalGas =
      object.totalGas !== undefined && object.totalGas !== null
        ? Long.fromValue(object.totalGas)
        : Long.UZERO;
    return message;
  },
};

function createBaseGasMeter(): GasMeter {
  return { contract: "", participant: "", cumulativeGas: Long.UZERO };
}

export const GasMeter = {
  encode(
    message: GasMeter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.contract !== "") {
      writer.uint32(10).string(message.contract);
    }
    if (message.participant !== "") {
      writer.uint32(18).string(message.participant);
    }
    if (!message.cumulativeGas.isZero()) {
      writer.uint32(24).uint64(message.cumulativeGas);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GasMeter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGasMeter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contract = reader.string();
          break;
        case 2:
          message.participant = reader.string();
          break;
        case 3:
          message.cumulativeGas = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GasMeter {
    return {
      contract: isSet(object.contract) ? String(object.contract) : "",
      participant: isSet(object.participant) ? String(object.participant) : "",
      cumulativeGas: isSet(object.cumulativeGas)
        ? Long.fromValue(object.cumulativeGas)
        : Long.UZERO,
    };
  },

  toJSON(message: GasMeter): unknown {
    const obj: any = {};
    message.contract !== undefined && (obj.contract = message.contract);
    message.participant !== undefined &&
      (obj.participant = message.participant);
    message.cumulativeGas !== undefined &&
      (obj.cumulativeGas = (message.cumulativeGas || Long.UZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GasMeter>, I>>(object: I): GasMeter {
    const message = createBaseGasMeter();
    message.contract = object.contract ?? "";
    message.participant = object.participant ?? "";
    message.cumulativeGas =
      object.cumulativeGas !== undefined && object.cumulativeGas !== null
        ? Long.fromValue(object.cumulativeGas)
        : Long.UZERO;
    return message;
  },
};

function createBaseRegisterIncentiveProposal(): RegisterIncentiveProposal {
  return {
    title: "",
    description: "",
    contract: "",
    allocations: [],
    epochs: 0,
  };
}

export const RegisterIncentiveProposal = {
  encode(
    message: RegisterIncentiveProposal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.contract !== "") {
      writer.uint32(26).string(message.contract);
    }
    for (const v of message.allocations) {
      DecCoin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    if (message.epochs !== 0) {
      writer.uint32(40).uint32(message.epochs);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): RegisterIncentiveProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRegisterIncentiveProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.contract = reader.string();
          break;
        case 4:
          message.allocations.push(DecCoin.decode(reader, reader.uint32()));
          break;
        case 5:
          message.epochs = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RegisterIncentiveProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      contract: isSet(object.contract) ? String(object.contract) : "",
      allocations: Array.isArray(object?.allocations)
        ? object.allocations.map((e: any) => DecCoin.fromJSON(e))
        : [],
      epochs: isSet(object.epochs) ? Number(object.epochs) : 0,
    };
  },

  toJSON(message: RegisterIncentiveProposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    message.contract !== undefined && (obj.contract = message.contract);
    if (message.allocations) {
      obj.allocations = message.allocations.map((e) =>
        e ? DecCoin.toJSON(e) : undefined
      );
    } else {
      obj.allocations = [];
    }
    message.epochs !== undefined && (obj.epochs = Math.round(message.epochs));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RegisterIncentiveProposal>, I>>(
    object: I
  ): RegisterIncentiveProposal {
    const message = createBaseRegisterIncentiveProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.contract = object.contract ?? "";
    message.allocations =
      object.allocations?.map((e) => DecCoin.fromPartial(e)) || [];
    message.epochs = object.epochs ?? 0;
    return message;
  },
};

function createBaseCancelIncentiveProposal(): CancelIncentiveProposal {
  return { title: "", description: "", contract: "" };
}

export const CancelIncentiveProposal = {
  encode(
    message: CancelIncentiveProposal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.contract !== "") {
      writer.uint32(26).string(message.contract);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): CancelIncentiveProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCancelIncentiveProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.contract = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CancelIncentiveProposal {
    return {
      title: isSet(object.title) ? String(object.title) : "",
      description: isSet(object.description) ? String(object.description) : "",
      contract: isSet(object.contract) ? String(object.contract) : "",
    };
  },

  toJSON(message: CancelIncentiveProposal): unknown {
    const obj: any = {};
    message.title !== undefined && (obj.title = message.title);
    message.description !== undefined &&
      (obj.description = message.description);
    message.contract !== undefined && (obj.contract = message.contract);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CancelIncentiveProposal>, I>>(
    object: I
  ): CancelIncentiveProposal {
    const message = createBaseCancelIncentiveProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.contract = object.contract ?? "";
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds.toNumber() * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}