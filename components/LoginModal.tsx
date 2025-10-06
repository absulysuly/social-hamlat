
import React from 'react';
import { User, UserRole, Language } from '../types.ts';
import { MOCK_USERS } from '../constants.ts';
import { EditIcon, XMarkIcon } from './icons/Icons.tsx';
import LanguageSwitcher from './LanguageSwitcher.tsx';
import { UI_TEXT } from '../translations.ts';

interface LoginModalProps {
    onLogin: (user: User) => void;
    onClose: () => void;
    language: Language;
    onLanguageChange: (lang: Language) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onLogin, onClose, language, onLanguageChange }) => {
    const handleSelectRole = (role: UserRole) => {
        // TODO: Replace this with a real authentication API call.
        // This function should send a request to your backend's /login or /register endpoint.
        // The backend should return a user object and a session token.
        const userToLogin = MOCK_USERS.find(user => user.role === role);
        if (userToLogin) {
            onLogin(userToLogin);
        }
    };
    
    const texts = UI_TEXT[language];

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm p-4" onClick={onClose}>
            <div 
                className="bg-mocha-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-sm p-6 text-center relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-2 right-2 p-2 rounded-full hover:bg-neutral-gray-light dark:hover:bg-gray-700">
                    <XMarkIcon className="w-6 h-6" />
                </button>

                <LanguageSwitcher language={language} onLanguageChange={onLanguageChange} />

                <h2 className="text-xl font-bold mb-2 mt-4">{texts.welcomeToHamlet}</h2>
                <p className="text-neutral-gray-dark dark:text-gray-400 mb-6">{texts.chooseYourRole}</p>
                
                <div className="space-y-4">
                    <button 
                        onClick={() => handleSelectRole(UserRole.Voter)}
                        className="w-full text-left p-4 border dark:border-gray-700 rounded-lg hover:bg-neutral-gray-light dark:hover:bg-gray-700 transition-colors"
                    >
                        <h3 className="font-bold text-md">{texts.iAmVoter}</h3>
                        <p className="text-sm text-neutral-gray-dark dark:text-gray-400">{texts.voterDescription}</p>
                    </button>
                    <button 
                        onClick={() => handleSelectRole(UserRole.Candidate)}
                        className="w-full text-left p-4 border dark:border-gray-700 rounded-lg hover:bg-neutral-gray-light dark:hover:bg-gray-700 transition-colors"
                    >
                        <h3 className="font-bold text-md flex items-center">
                            {texts.iAmCandidate}
                            <EditIcon className="w-4 h-4 ml-2 text-action-blue" />
                        </h3>
                        <p className="text-sm text-neutral-gray-dark dark:text-gray-400">{texts.candidateDescription}</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
