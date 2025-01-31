/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

/*** THIS FILE IS GENERATED, DO NOT EDIT ***/

import { MutableCluster } from "../../cluster/mutation/MutableCluster.js";
import {
    Attribute,
    WritableAttribute,
    AccessLevel,
    Command,
    TlvNoResponse,
    OptionalAttribute,
    OptionalWritableAttribute
} from "../../cluster/Cluster.js";
import { TlvUInt16, TlvUInt8, TlvBitmap, TlvEnum } from "../../tlv/TlvNumber.js";
import { TlvNullable } from "../../tlv/TlvNullable.js";
import { TlvObject, TlvField } from "../../tlv/TlvObject.js";
import { TypeFromSchema } from "../../tlv/TlvSchema.js";
import { BitFlag } from "../../schema/BitmapSchema.js";
import { Identity } from "../../util/Type.js";
import { ClusterRegistry } from "../../cluster/ClusterRegistry.js";

export namespace LevelControl {
    /**
     * Input to the LevelControl moveToClosestFrequency command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6.5
     */
    export const TlvMoveToClosestFrequencyRequest = TlvObject({ frequency: TlvField(0, TlvUInt16) });

    /**
     * Input to the LevelControl moveToClosestFrequency command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6.5
     */
    export interface MoveToClosestFrequencyRequest extends TypeFromSchema<typeof TlvMoveToClosestFrequencyRequest> {}

    /**
     * The value of the LevelControl options attribute
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.5.8
     */
    export const Options = { executeIfOff: BitFlag(0), coupleColorTempToLevel: BitFlag(1) };

    /**
     * Input to the LevelControl moveToLevel command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6.1
     */
    export const TlvMoveToLevelRequest = TlvObject({
        level: TlvField(0, TlvUInt8.bound({ max: 254 })),
        transitionTime: TlvField(1, TlvNullable(TlvUInt16)),
        optionsMask: TlvField(2, TlvBitmap(TlvUInt8, Options)),
        optionsOverride: TlvField(3, TlvBitmap(TlvUInt8, Options))
    });

    /**
     * Input to the LevelControl moveToLevel command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6.1
     */
    export interface MoveToLevelRequest extends TypeFromSchema<typeof TlvMoveToLevelRequest> {}

    export enum MoveMode {
        Up = 0,
        Down = 1
    }

    /**
     * Input to the LevelControl move command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6.2
     */
    export const TlvMoveRequest = TlvObject({
        /**
         * The MoveMode field shall be one of the non-reserved values in Values of the MoveMode Field.
         *
         * @see {@link MatterSpecification.v11.Cluster} § 1.6.6.2.1
         */
        moveMode: TlvField(0, TlvEnum<MoveMode>()),

        /**
         * The Rate field specifies the rate of movement in units per second. The actual rate of movement SHOULD be as
         * close to this rate as the device is able. If the Rate field is equal to null, then the value in
         * DefaultMoveRate attribute shall be used. However, if the Rate field is equal to null and the DefaultMoveRate
         * attribute is not supported, or if the Rate field is equal to null and the value of the DefaultMoveRate
         * attribute is equal to null, then the device SHOULD move as fast as it is able. If the device is not able to
         * move at a variable rate, this field may be disregarded.
         *
         * @see {@link MatterSpecification.v11.Cluster} § 1.6.6.2.2
         */
        rate: TlvField(1, TlvNullable(TlvUInt8)),

        optionsMask: TlvField(2, TlvBitmap(TlvUInt8, Options)),
        optionsOverride: TlvField(3, TlvBitmap(TlvUInt8, Options))
    });

    /**
     * Input to the LevelControl move command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6.2
     */
    export interface MoveRequest extends TypeFromSchema<typeof TlvMoveRequest> {}

    export enum StepMode {
        Up = 0,
        Down = 1
    }

    /**
     * Input to the LevelControl step command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6.3
     */
    export const TlvStepRequest = TlvObject({
        stepMode: TlvField(0, TlvEnum<StepMode>()),
        stepSize: TlvField(1, TlvUInt8),
        transitionTime: TlvField(2, TlvNullable(TlvUInt16)),
        optionsMask: TlvField(3, TlvBitmap(TlvUInt8, Options)),
        optionsOverride: TlvField(4, TlvBitmap(TlvUInt8, Options))
    });

    /**
     * Input to the LevelControl step command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6.3
     */
    export interface StepRequest extends TypeFromSchema<typeof TlvStepRequest> {}

    /**
     * Input to the LevelControl stop command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6.4
     */
    export const TlvStopRequest = TlvObject({
        optionsMask: TlvField(0, TlvBitmap(TlvUInt8, Options)),
        optionsOverride: TlvField(1, TlvBitmap(TlvUInt8, Options))
    });

    /**
     * Input to the LevelControl stop command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6.4
     */
    export interface StopRequest extends TypeFromSchema<typeof TlvStopRequest> {}

    /**
     * Input to the LevelControl moveToLevelWithOnOff command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6
     */
    export const TlvMoveToLevelWithOnOffRequest = TlvObject({
        level: TlvField(0, TlvUInt8),
        transitionTime: TlvField(1, TlvNullable(TlvUInt16)),
        optionsMask: TlvField(2, TlvBitmap(TlvUInt8, Options)),
        optionsOverride: TlvField(3, TlvBitmap(TlvUInt8, Options))
    });

    /**
     * Input to the LevelControl moveToLevelWithOnOff command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6
     */
    export interface MoveToLevelWithOnOffRequest extends TypeFromSchema<typeof TlvMoveToLevelWithOnOffRequest> {}

    /**
     * Input to the LevelControl moveWithOnOff command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6
     */
    export const TlvMoveWithOnOffRequest = TlvObject({
        moveMode: TlvField(0, TlvEnum<MoveMode>()),
        rate: TlvField(1, TlvNullable(TlvUInt8)),
        optionsMask: TlvField(2, TlvBitmap(TlvUInt8, Options)),
        optionsOverride: TlvField(3, TlvBitmap(TlvUInt8, Options))
    });

    /**
     * Input to the LevelControl moveWithOnOff command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6
     */
    export interface MoveWithOnOffRequest extends TypeFromSchema<typeof TlvMoveWithOnOffRequest> {}

    /**
     * Input to the LevelControl stepWithOnOff command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6
     */
    export const TlvStepWithOnOffRequest = TlvObject({
        stepMode: TlvField(0, TlvEnum<StepMode>()),
        stepSize: TlvField(1, TlvUInt8),
        transitionTime: TlvField(2, TlvNullable(TlvUInt16)),
        optionsMask: TlvField(3, TlvBitmap(TlvUInt8, Options)),
        optionsOverride: TlvField(4, TlvBitmap(TlvUInt8, Options))
    });

    /**
     * Input to the LevelControl stepWithOnOff command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6
     */
    export interface StepWithOnOffRequest extends TypeFromSchema<typeof TlvStepWithOnOffRequest> {}

    /**
     * Input to the LevelControl stopWithOnOff command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6
     */
    export const TlvStopWithOnOffRequest = TlvObject({
        optionsMask: TlvField(0, TlvBitmap(TlvUInt8, Options)),
        optionsOverride: TlvField(1, TlvBitmap(TlvUInt8, Options))
    });

    /**
     * Input to the LevelControl stopWithOnOff command
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.6
     */
    export interface StopWithOnOffRequest extends TypeFromSchema<typeof TlvStopWithOnOffRequest> {}

    /**
     * A LevelControlCluster supports these elements if it supports feature Lighting.
     */
    export const LightingComponent = MutableCluster.Component({
        attributes: {
            /**
             * The RemainingTime attribute represents the time remaining until the current command is complete - it is
             * specified in 1/10ths of a second.
             *
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.5.2
             */
            remainingTime: Attribute(0x1, TlvUInt16, { default: 0 }),

            /**
             * The StartUpCurrentLevel attribute shall define the desired startup level for a device when it is
             * supplied with power and this level shall be reflected in the CurrentLevel attribute. The values of the
             * StartUpCurrentLevel attribute are listed below:
             *
             * Table 20. Values of the StartUpCurrentLevel attribute
             *
             * This behavior does not apply to reboots associated with OTA. After an OTA restart, the CurrentLevel
             * attribute shall return to its value prior to the restart.
             *
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.5.14
             */
            startUpCurrentLevel: WritableAttribute(
                0x4000,
                TlvNullable(TlvUInt8),
                { persistent: true, writeAcl: AccessLevel.Manage }
            )
        }
    });

    /**
     * A LevelControlCluster supports these elements if it supports feature Frequency.
     */
    export const FrequencyComponent = MutableCluster.Component({
        attributes: {
            /**
             * The CurrentFrequency attribute represents the frequency at which the device is at CurrentLevel. A
             * CurrentFrequency of 0 is unknown.
             *
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.5.5
             */
            currentFrequency: Attribute(0x4, TlvUInt16, { scene: true, default: 0 }),

            /**
             * The MinFrequency attribute indicates the minimum value of CurrentFrequency that is capable of being
             * assigned. MinFrequency shall be less than or equal to MaxFrequency. A value of 0 indicates undefined.
             *
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.5.6
             */
            minFrequency: Attribute(0x5, TlvUInt16, { default: 0 }),

            /**
             * The MaxFrequency attribute indicates the maximum value of CurrentFrequency that is capable of being
             * assigned. MaxFrequency shall be greater than or equal to MinFrequency. A value of 0 indicates undefined.
             *
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.5.7
             */
            maxFrequency: Attribute(0x6, TlvUInt16, { default: 0 })
        },

        commands: {
            /**
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.6.5
             */
            moveToClosestFrequency: Command(0x8, TlvMoveToClosestFrequencyRequest, 0x8, TlvNoResponse)
        }
    });

    /**
     * These are optional features supported by LevelControlCluster.
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6.4
     */
    export enum Feature {
        /**
         * OnOff
         *
         * Dependency with the On/Off cluster
         */
        OnOff = "OnOff",

        /**
         * Lighting
         *
         * Behavior that supports lighting applications
         */
        Lighting = "Lighting",

        /**
         * Frequency
         *
         * Supports frequency attributes and behavior. The Pulse Width Modulation cluster was created for frequency
         * control.
         */
        Frequency = "Frequency"
    }

    /**
     * These elements and properties are present in all LevelControl clusters.
     */
    export const Base = MutableCluster.Component({
        id: 0x8,
        name: "LevelControl",
        revision: 5,

        features: {
            /**
             * OnOff
             *
             * Dependency with the On/Off cluster
             */
            onOff: BitFlag(0),

            /**
             * Lighting
             *
             * Behavior that supports lighting applications
             */
            lighting: BitFlag(1),

            /**
             * Frequency
             *
             * Supports frequency attributes and behavior. The Pulse Width Modulation cluster was created for frequency
             * control.
             */
            frequency: BitFlag(2)
        },

        attributes: {
            /**
             * The CurrentLevel attribute represents the current level of this device. The meaning of 'level' is device
             * dependent.
             *
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.5.1
             */
            currentLevel: Attribute(0x0, TlvNullable(TlvUInt8), { scene: true, persistent: true, default: null }),

            /**
             * The MinLevel attribute indicates the minimum value of CurrentLevel that is capable of being assigned.
             *
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.5.3
             */
            minLevel: OptionalAttribute(0x2, TlvUInt8, { default: 0 }),

            /**
             * The MaxLevel attribute indicates the maximum value of CurrentLevel that is capable of being assigned.
             *
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.5.4
             */
            maxLevel: OptionalAttribute(0x3, TlvUInt8.bound({ max: 254 }), { default: 254 }),

            /**
             * The Options attribute is meant to be changed only during commissioning. The Options attribute is a
             * bitmap that determines the default behavior of some cluster commands. Each command that is dependent on
             * the Options attribute shall first construct a temporary Options bitmap that is in effect during the
             * command processing. The temporary Options bitmap has the same format and meaning as the Options
             * attribute, but includes any bits that may be overridden by command fields.
             *
             * Below is the format and description of the Options attribute and temporary Options bitmap and the effect
             * on dependent commands.
             *
             * Table 19. Options Attribute
             *
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.5.8
             */
            options: WritableAttribute(0xf, TlvBitmap(TlvUInt8, Options)),

            /**
             * The OnOffTransitionTime attribute represents the time taken to move to or from the target level when On
             * or Off commands are received by an On/Off cluster on the same endpoint. It is specified in 1/10ths of a
             * second.
             *
             * The actual time taken SHOULD be as close to OnOffTransitionTime as the device is able. Please note that
             * if the device is not able to move at a variable rate, the OnOffTransitionTime attribute SHOULD NOT be
             * implemented.
             *
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.5.9
             */
            onOffTransitionTime: OptionalWritableAttribute(0x10, TlvUInt16, { default: 0 }),

            /**
             * The OnLevel attribute determines the value that the CurrentLevel attribute is set to when the OnOff
             * attribute of an On/Off cluster on the same endpoint is set to TRUE, as a result of processing an On/Off
             * cluster command. If the OnLevel attribute is not implemented, or is set to the null value, it has no
             * effect. For more details see Effect of On/Off Commands on the CurrentLevel Attribute.
             *
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.5.10
             */
            onLevel: WritableAttribute(0x11, TlvNullable(TlvUInt8), { default: null }),

            /**
             * The OnTransitionTime attribute represents the time taken to move the current level from the minimum
             * level to the maximum level when an On command is received by an On/Off cluster on the same endpoint. It
             * is specified in 10ths of a second. If this attribute is not implemented, or contains a null value, the
             * OnOffTransitionTime will be used instead.
             *
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.5.11
             */
            onTransitionTime: OptionalWritableAttribute(0x12, TlvNullable(TlvUInt16), { default: null }),

            /**
             * The OffTransitionTime attribute represents the time taken to move the current level from the maximum
             * level to the minimum level when an Off command is received by an On/Off cluster on the same endpoint. It
             * is specified in 10ths of a second. If this attribute is not implemented, or contains a null value, the
             * OnOffTransitionTime will be used instead.
             *
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.5.12
             */
            offTransitionTime: OptionalWritableAttribute(0x13, TlvNullable(TlvUInt16), { default: null }),

            /**
             * The DefaultMoveRate attribute determines the movement rate, in units per second, when a Move command is
             * received with a null value Rate parameter.
             *
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.5.13
             */
            defaultMoveRate: OptionalWritableAttribute(0x14, TlvNullable(TlvUInt8))
        },

        commands: {
            /**
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.6.1
             */
            moveToLevel: Command(0x0, TlvMoveToLevelRequest, 0x0, TlvNoResponse),

            /**
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.6.2
             */
            move: Command(0x1, TlvMoveRequest, 0x1, TlvNoResponse),

            /**
             * The StepMode field shall be one of the non-reserved values in Values of the StepMode Field.
             *
             * The TransitionTime field specifies the time that shall be taken to perform the step, in tenths of a
             * second. A step is a change in the CurrentLevel of StepSize units. The actual time taken SHOULD be as
             * close to this as the device is able. If the TransitionTime field is equal to null, the device SHOULD
             * move as fast as it is able.
             *
             * If the device is not able to move at a variable rate, the TransitionTime field may be disregarded.
             *
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.6.3
             */
            step: Command(0x2, TlvStepRequest, 0x2, TlvNoResponse),

            /**
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.6.4
             */
            stop: Command(0x3, TlvStopRequest, 0x3, TlvNoResponse),

            /**
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.6
             */
            moveToLevelWithOnOff: Command(0x4, TlvMoveToLevelWithOnOffRequest, 0x4, TlvNoResponse),

            /**
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.6
             */
            moveWithOnOff: Command(0x5, TlvMoveWithOnOffRequest, 0x5, TlvNoResponse),

            /**
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.6
             */
            stepWithOnOff: Command(0x6, TlvStepWithOnOffRequest, 0x6, TlvNoResponse),

            /**
             * @see {@link MatterSpecification.v11.Cluster} § 1.6.6
             */
            stopWithOnOff: Command(0x7, TlvStopWithOnOffRequest, 0x7, TlvNoResponse)
        },

        /**
         * This metadata controls which LevelControlCluster elements matter.js activates for specific feature
         * combinations.
         */
        extensions: MutableCluster.Extensions(
            { flags: { lighting: true }, component: LightingComponent },
            { flags: { frequency: true }, component: FrequencyComponent }
        )
    });

    /**
     * @see {@link Cluster}
     */
    export const ClusterInstance = MutableCluster({ ...Base, supportedFeatures: { onOff: true } });

    /**
     * Level Control
     *
     * This cluster provides an interface for controlling a characteristic of a device that can be set to a level, for
     * example the brightness of a light, the degree of closure of a door, or the power output of a heater.
     *
     * LevelControlCluster supports optional features that you can enable with the LevelControlCluster.with() factory
     * method.
     *
     * @see {@link MatterSpecification.v11.Cluster} § 1.6
     */
    export interface Cluster extends Identity<typeof ClusterInstance> {}

    export const Cluster: Cluster = ClusterInstance;
    const LT = { lighting: true };
    const FQ = { frequency: true };

    /**
     * @see {@link Complete}
     */
    export const CompleteInstance = MutableCluster({
        id: Cluster.id,
        name: Cluster.name,
        revision: Cluster.revision,
        features: Cluster.features,

        attributes: {
            ...Cluster.attributes,
            remainingTime: MutableCluster.AsConditional(
                LightingComponent.attributes.remainingTime,
                { mandatoryIf: [LT] }
            ),
            currentFrequency: MutableCluster.AsConditional(
                FrequencyComponent.attributes.currentFrequency,
                { mandatoryIf: [FQ] }
            ),
            minFrequency: MutableCluster.AsConditional(
                FrequencyComponent.attributes.minFrequency,
                { mandatoryIf: [FQ] }
            ),
            maxFrequency: MutableCluster.AsConditional(
                FrequencyComponent.attributes.maxFrequency,
                { mandatoryIf: [FQ] }
            ),
            startUpCurrentLevel: MutableCluster.AsConditional(
                LightingComponent.attributes.startUpCurrentLevel,
                { mandatoryIf: [LT] }
            )
        },

        commands: {
            ...Cluster.commands,
            moveToClosestFrequency: MutableCluster.AsConditional(
                FrequencyComponent.commands.moveToClosestFrequency,
                { mandatoryIf: [FQ] }
            )
        }
    });

    /**
     * This cluster supports all LevelControl features. It may support illegal feature combinations.
     *
     * If you use this cluster you must manually specify which features are active and ensure the set of active
     * features is legal per the Matter specification.
     */
    export interface Complete extends Identity<typeof CompleteInstance> {}

    export const Complete: Complete = CompleteInstance;
}

export type LevelControlCluster = LevelControl.Cluster;
export const LevelControlCluster = LevelControl.Cluster;
ClusterRegistry.register(LevelControl.Complete);
