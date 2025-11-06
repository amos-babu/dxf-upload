import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export type CategoryOptionsProps = {
    name: string;
    value: string;
};

export type CreateProps = {
    name: string;
    description: string;
    category: string;
    image: File | null;
    dxf_file: File | null;
};

export interface FlashProps {
    flash: {
        success?: string;
    };
    [key: string]: string | undefined;
}

export interface FileDataProps {
    id: number;
    name: string;
    image: string;
    dxfFile: string;
    description: string;
}

export interface ShowFileDataProps {
    data: {
        id: number;
        name: string;
        description: string;
        image: string;
        dxfFile: string;
        createdAt: string;
        category: string;
    };
    isFavorite?: boolean;
}

export interface FileProps {
    data: FileDataProps[];
    links: LinksProps;
    meta: MetaProps;
}

export interface MetaProps {
    current_page: number;
    current_page_url: string;
    from: number;
    // last_page: number;
    // links: {
    //     active: boolean;
    //     label: string;
    //     url: string;
    // }[];
    path: string;
    per_page: number;
    to: number;
    // total: number;
}

export interface LinksProps {
    first?: string;
    last?: string;
    next?: string;
    prev?: string;
}

export interface DashboardPageProps {
    files: FileProps;
}

interface SearchFileProps extends InertiaPageProps {
    posts: FileProps;
}
