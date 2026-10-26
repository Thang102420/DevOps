import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Search, 
  ChevronDown, 
  Building2, 
  Check, 
  Sparkles, 
  X,
  Compass
} from 'lucide-react';
import { 
  VIETNAM_PROVINCES, 
  searchAddressSuggestions,
  PopularAddressSuggestion
} from '../data/vietnamAddresses';

interface AddressSelectorProps {
  value: string;
  onChange: (address: string) => void;
  required?: boolean;
}

export const AddressSelector: React.FC<AddressSelectorProps> = ({
  value,
  onChange,
  required = true,
}) => {
  const [mode, setMode] = useState<'smart' | 'cascader'>('smart');
  
  // Smart Search States
  const [searchQuery, setSearchQuery] = useState(value);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState<PopularAddressSuggestion[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cascader States (Tỉnh -> Quận -> Phường -> Số nhà)
  const [selectedProvinceId, setSelectedProvinceId] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [streetNumber, setStreetNumber] = useState('');

  // Sync external value
  useEffect(() => {
    setSearchQuery(value);
  }, [value]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpenDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions on query change
  useEffect(() => {
    if (mode === 'smart') {
      const results = searchAddressSuggestions(searchQuery);
      setSuggestions(results);
    }
  }, [searchQuery, mode]);

  // Derived lists for Cascader
  const currentProvince = VIETNAM_PROVINCES.find((p) => p.id === selectedProvinceId);
  const currentDistrict = currentProvince?.districts.find((d) => d.id === selectedDistrictId);

  const handleSelectSuggestion = (item: PopularAddressSuggestion) => {
    setSearchQuery(item.detail);
    onChange(item.detail);
    setIsOpenDropdown(false);
  };

  const handleApplyCascader = () => {
    if (!currentProvince) return;
    const parts: string[] = [];
    if (streetNumber.trim()) parts.push(streetNumber.trim());
    if (selectedWard.trim()) parts.push(selectedWard.trim());
    if (currentDistrict?.name) parts.push(currentDistrict.name);
    parts.push(currentProvince.name);

    const full = parts.join(', ');
    setSearchQuery(full);
    onChange(full);
    setMode('smart');
  };

  return (
    <div className="space-y-2.5">
      
      {/* Mode Selector Tabs */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span>Địa chỉ nhận hàng {required && <span className="text-rose-500">*</span>}</span>
        </label>

        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setMode('smart')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
              mode === 'smart'
                ? 'bg-white text-blue-600 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Gợi ý nhanh</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('cascader')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
              mode === 'cascader'
                ? 'bg-white text-blue-600 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3 h-3 text-blue-600" />
            <span>Chọn Tỉnh / Quận / Phường</span>
          </button>
        </div>
      </div>

      {/* MODE 1: Smart Search / Suggestion Autocomplete */}
      {mode === 'smart' && (
        <div className="relative" ref={dropdownRef}>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            
            <input
              type="text"
              required={required}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onChange(e.target.value);
                setIsOpenDropdown(true);
              }}
              onFocus={() => setIsOpenDropdown(true)}
              placeholder="Nhập số nhà, tên đường, tòa nhà hoặc gõ 'Landmark', 'Cầu Giấy'..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  onChange('');
                }}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 absolute right-2.5 top-1/2 -translate-y-1/2"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Filter City Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
            <span className="text-[10px] text-slate-400 font-medium">Khu vực nhanh:</span>
            {['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'Bình Dương'].map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  setSearchQuery(city);
                  onChange(city);
                  setIsOpenDropdown(true);
                }}
                className="text-[10px] bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 px-2 py-0.5 rounded-md font-medium transition-colors"
              >
                {city}
              </button>
            ))}
          </div>

          {/* Dropdown Suggestions List */}
          {isOpenDropdown && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden divide-y divide-slate-100 max-h-72 overflow-y-auto animate-fade-in">
              <div className="px-3.5 py-2 bg-slate-50/80 flex items-center justify-between text-[11px] font-bold text-slate-600">
                <span className="flex items-center gap-1 text-blue-700">
                  <Compass className="w-3.5 h-3.5" />
                  Gợi ý địa chỉ giao hàng chuẩn
                </span>
                <span className="text-slate-400 font-normal">Bấm để chọn nhanh</span>
              </div>

              {suggestions.length > 0 ? (
                suggestions.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectSuggestion(item)}
                    className="p-3 hover:bg-blue-50/60 cursor-pointer transition-colors flex items-start gap-2.5 group"
                  >
                    <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors mt-0.5 shrink-0">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                          {item.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-slate-500">
                  Không tìm thấy địa chỉ mẫu khớp với từ khóa "{searchQuery}".
                  <br />
                  <span className="text-[11px] text-slate-400">
                    Bạn vẫn có thể gõ trực tiếp số nhà, tên đường cụ thể của mình.
                  </span>
                </div>
              )}

              {/* Footer Switcher */}
              <div className="p-2.5 bg-slate-50 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpenDropdown(false);
                    setMode('cascader');
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 underline flex items-center justify-center gap-1 mx-auto"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Hoặc chọn lần lượt theo Tỉnh / Quận / Phường</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 2: Cascader Selector (Tỉnh / Thành -> Quận / Huyện -> Phường / Xã) */}
      {mode === 'cascader' && (
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/90 space-y-3 animate-fade-in">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* 1. Tỉnh / Thành phố */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Tỉnh / Thành phố
              </label>
              <div className="relative">
                <select
                  value={selectedProvinceId}
                  onChange={(e) => {
                    setSelectedProvinceId(e.target.value);
                    setSelectedDistrictId('');
                    setSelectedWard('');
                  }}
                  className="w-full pl-2.5 pr-8 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="">-- Chọn Tỉnh / Thành --</option>
                  {VIETNAM_PROVINCES.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 2. Quận / Huyện */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Quận / Huyện
              </label>
              <div className="relative">
                <select
                  disabled={!selectedProvinceId}
                  value={selectedDistrictId}
                  onChange={(e) => {
                    setSelectedDistrictId(e.target.value);
                    setSelectedWard('');
                  }}
                  className="w-full pl-2.5 pr-8 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <option value="">-- Chọn Quận / Huyện --</option>
                  {currentProvince?.districts.map((dist) => (
                    <option key={dist.id} value={dist.id}>
                      {dist.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* 3. Phường / Xã */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Phường / Xã
              </label>
              <div className="relative">
                <select
                  disabled={!selectedDistrictId}
                  value={selectedWard}
                  onChange={(e) => setSelectedWard(e.target.value)}
                  className="w-full pl-2.5 pr-8 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none disabled:bg-slate-100 disabled:text-slate-400"
                >
                  <option value="">-- Chọn Phường / Xã --</option>
                  {currentDistrict?.wards.map((ward) => (
                    <option key={ward} value={ward}>
                      {ward}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* 4. Số nhà, tên đường */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Số nhà, ngõ/ngách, tên đường cụ thể:
            </label>
            <input
              type="text"
              value={streetNumber}
              onChange={(e) => setStreetNumber(e.target.value)}
              placeholder="Ví dụ: Số 28 ngõ 165 đường Cầu Giấy..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Apply button */}
          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setMode('smart')}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium"
            >
              Hủy, quay lại gõ nhanh
            </button>

            <button
              type="button"
              onClick={handleApplyCascader}
              disabled={!selectedProvinceId}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Áp dụng địa chỉ này</span>
            </button>
          </div>

        </div>
      )}

      {/* Current Address confirmation note if set */}
      {value && (
        <div className="flex items-start gap-1.5 text-[11px] text-emerald-800 bg-emerald-50/90 border border-emerald-200/80 px-3 py-1.5 rounded-xl">
          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
          <span>
            Địa chỉ nhận: <strong className="font-semibold text-slate-900">{value}</strong>
          </span>
        </div>
      )}

    </div>
  );
};
