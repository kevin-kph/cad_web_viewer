import { IService, ServiceName, ServiceRegistry } from './types';
/**
 * Service Registry for managing services in the application.
 * This registry allows for registering, unregistering, and retrieving services by their names.
 * It also provides utility functions to check for service existence and clear all services.
 */
export declare const serviceRegistry: ServiceRegistry;
/**
 * Registers a service in the service registry.
 * If a service with the same name already exists, it will be overwritten.
 *
 * @param {IService} service - The service to register.
 * @throws {Error} If the service does not have a serviceName property.
 */
export declare function registerService(service: IService): void;
/**
 * Unregisters a service from the service registry.
 * If the service does not exist, an error is thrown.
 *
 * @param {ServiceName} serviceName - The name of the service to unregister.
 * @throws {Error} If the service with the given name is not registered.
 */
export declare function unregisterService(serviceName: ServiceName): void;
/**
 * Retrieves a service from the service registry by its name.
 *
 * @param serviceName - The name of the service to retrieve.
 * @returns {T | undefined} - The service if found, otherwise undefined.
 * @template T - The type of the service to retrieve, extending from IService.
 */
export declare function tryGetService<T extends IService>(serviceName: ServiceName): T | undefined;
/**
 * Retrieves a service from the service registry by its name, throw if the service is not registered.
 *
 * @param serviceName - The name of the service to retrieve.
 * @returns T - The service if found, otherwise undefined.
 * @template T - The type of the service to retrieve, extending from IService.
 */
export declare function getService<T extends IService>(serviceName: ServiceName): T;
/**
 * Retrieves all registered services.
 *
 * @returns {ServiceRegistry} - An object containing all registered services.
 */
export declare function getAllServices(): ServiceRegistry;
/**
 * Checks if a service is registered in the service registry.
 *
 * @param {ServiceName} serviceName - The name of the service to check.
 * @returns {boolean} - True if the service is registered, false otherwise.
 */
export declare function hasService(serviceName: ServiceName): boolean;
/**
 * Clears all services from the service registry.
 * This will remove all registered services and reset the registry.
 */
export declare function clearServices(): void;
