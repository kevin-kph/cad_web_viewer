import { Camera } from '../Camera';
import { CameraChannel } from './Channel';
import { InterpolationType } from './Sampler';
import { Animation } from './Animation';
/**
 * Convenience method that sets up Animation channels, samplers, and keyframe buffers for the supplied camera.
 *
 * The created channel and buffer names will have the form: <namePrefix>-<Property> where type is the corresponding value of [[CameraProperty]]
 * @param animation Animation that will receive the new camera channels.  This animation should not contain any camera channels.
 * @param namePrefix Prefix to use for channel names.
 * @param interpolationType The type of interpolation that will be set on each sampler that is created.
 */
export declare function createCameraChannels(animation: Animation, namePrefix: string, interpolationType: InterpolationType): CameraChannel[];
/**
 * Convenience method that will update keyframe buffers for animation channels created with [[createChannelsForCamera]].
 * @param t Animation time (in seconds) that will be used for the created keyframes
 * @param camera Camera containing the current values to keyframe.
 * @param animation An animation containing camera channels created using [[createChannelsForCamera]]
 */
export declare function keyframeCamera(t: number, camera: Camera, animation: Animation): void;
