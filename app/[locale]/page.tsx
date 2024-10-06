'use client';

import { useTranslation } from 'next-i18next';
import { usePathname } from 'next/navigation';

export default function HomePage() {
    const pathname = usePathname();  // Get the current path, which includes the locale

    // Handle case when pathname is null (TypeScript safety)
    const locale = pathname ? pathname.split('/')[1] : 'en';  // Default to 'en' if pathname is null

    const { t } = useTranslation('common');  // Make sure to use the correct translation namespace

    return (
        <div>
            <h1>{t('order_transactions')}</h1>
            <p>Current locale: {locale}</p> {/* Display the extracted locale */}
        </div>
    );
}
